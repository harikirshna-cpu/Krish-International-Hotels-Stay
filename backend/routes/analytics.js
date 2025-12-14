const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const User = require('../models/User');

// Get analytics data (admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    // Total counts
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalHotels = await Hotel.countDocuments();

    // Total revenue
    const bookings = await Booking.find({ status: 'confirmed' }).populate('hotel');
    const totalRevenue = bookings.reduce((sum, booking) => {
      const nights = Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24));
      return sum + (booking.hotel.pricePerNight * nights);
    }, 0);

    // Monthly revenue (last 12 months)
    const monthlyRevenue = Array(12).fill(0);
    const currentMonth = new Date().getMonth();
    bookings.forEach(booking => {
      const bookingMonth = new Date(booking.createdAt).getMonth();
      const nights = Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24));
      monthlyRevenue[bookingMonth] += booking.hotel.pricePerNight * nights;
    });

    // Bookings by hotel
    const hotels = await Hotel.find();
    const bookingsByHotel = await Promise.all(
      hotels.slice(0, 5).map(async (hotel) => {
        const count = await Booking.countDocuments({ hotel: hotel._id });
        return { name: hotel.name, count };
      })
    );

    // User growth (last 12 months)
    const userGrowth = Array(12).fill(0);
    const users = await User.find();
    users.forEach(user => {
      const userMonth = new Date(user.createdAt).getMonth();
      userGrowth[userMonth]++;
    });

    res.json({
      totalRevenue: Math.round(totalRevenue),
      totalBookings,
      totalUsers,
      totalHotels,
      monthlyRevenue,
      bookingsByHotel,
      userGrowth
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});

module.exports = router;
