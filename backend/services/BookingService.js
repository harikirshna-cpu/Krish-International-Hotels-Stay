const BookingRepository = require('../repositories/BookingRepository');
const HotelRepository = require('../repositories/HotelRepository');
const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const { ApiError } = require('../utils/errorHandler');
const { sendBookingConfirmation } = require('../utils/notificationService');

const bookingRepository = new BookingRepository(Booking);
const hotelRepository = new HotelRepository(Hotel);

class BookingService {
  async createBooking(bookingData, userId) {
    const { hotel, checkInDate, checkOutDate, guests } = bookingData;

    // Check if hotel exists
    const hotelDoc = await hotelRepository.findById(hotel);
    if (!hotelDoc) {
      throw new ApiError(404, 'Hotel not found');
    }

    // Check availability
    const isAvailable = await bookingRepository.checkAvailability(
      hotel,
      checkInDate,
      checkOutDate
    );

    if (!isAvailable) {
      throw new ApiError(400, 'Hotel is not available for selected dates');
    }

    // Calculate total price
    const days = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = hotelDoc.price * days;

    // Create booking
    const booking = await bookingRepository.create({
      ...bookingData,
      user: userId,
      totalPrice,
      paymentStatus: 'completed'
    });

    // Update hotel availability
    await hotelRepository.updateAvailability(hotel, 1);

    // Populate booking for response
    const populatedBooking = await bookingRepository.findById(booking._id);

    // Calculate nights
    const nights = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
    );

    // Send confirmation email (async, don't wait)
    sendBookingConfirmation(
      populatedBooking.user.email,
      {
        hotelName: hotelDoc.name,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        totalAmount: totalPrice
      }
    ).catch(console.error);

    return populatedBooking;
  }

  async getUserBookings(userId, options = {}) {
    return await bookingRepository.findByUser(userId, options);
  }

  async getBookingById(id, userId) {
    const booking = await bookingRepository.findById(id);
    
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }

    // Check if booking belongs to user (unless admin)
    if (booking.user._id.toString() !== userId.toString()) {
      throw new ApiError(403, 'Not authorized to access this booking');
    }

    return booking;
  }

  async cancelBooking(id, userId) {
    const booking = await bookingRepository.findById(id);
    
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }

    if (booking.user._id.toString() !== userId.toString()) {
      throw new ApiError(403, 'Not authorized to cancel this booking');
    }

    if (booking.bookingStatus === 'cancelled') {
      throw new ApiError(400, 'Booking is already cancelled');
    }

    const cancelledBooking = await bookingRepository.cancel(id);

    // Send cancellation email
    emailService.sendCancellationEmail(
      cancelledBooking,
      { email: booking.user.email, name: booking.user.name },
      booking.hotel
    ).catch(console.error);

    return cancelledBooking;
  }

  async getAllBookings(options = {}) {
    return await bookingRepository.findAll({}, options);
  }
}

module.exports = new BookingService();
