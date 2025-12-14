class BookingRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(filters = {}, options = {}) {
    const { page = 1, limit = 10, sort = '-createdAt' } = options;
    const skip = (page - 1) * limit;

    const bookings = await this.model.find(filters)
      .populate('hotel', 'name location price images')
      .populate('user', 'name email phone')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await this.model.countDocuments(filters);

    return {
      bookings,
      total,
      page,
      pages: Math.ceil(total / limit)
    };
  }

  async findById(id) {
    return await this.model.findById(id)
      .populate('hotel', 'name location price images amenities')
      .populate('user', 'name email phone');
  }

  async findByUser(userId, options = {}) {
    return await this.findAll({ user: userId }, options);
  }

  async findByHotel(hotelId, options = {}) {
    return await this.findAll({ hotel: hotelId }, options);
  }

  async create(bookingData) {
    const booking = new this.model(bookingData);
    return await booking.save();
  }

  async update(id, updateData) {
    return await this.model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
  }

  async cancel(id) {
    return await this.model.findByIdAndUpdate(
      id,
      { bookingStatus: 'cancelled' },
      { new: true }
    );
  }

  async checkAvailability(hotelId, checkInDate, checkOutDate) {
    const overlappingBookings = await this.model.find({
      hotel: hotelId,
      bookingStatus: 'confirmed',
      $or: [
        {
          checkInDate: { $lte: checkOutDate },
          checkOutDate: { $gte: checkInDate }
        }
      ]
    });

    return overlappingBookings.length === 0;
  }
}

module.exports = BookingRepository;
