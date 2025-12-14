class HotelRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(filters = {}, options = {}) {
    const { page = 1, limit = 10, sort = '-createdAt' } = options;
    const skip = (page - 1) * limit;

    const query = this.model.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const hotels = await query;
    const total = await this.model.countDocuments(filters);

    return {
      hotels,
      total,
      page,
      pages: Math.ceil(total / limit)
    };
  }

  async findById(id) {
    return await this.model.findById(id).populate('reviews.user', 'name email');
  }

  async create(hotelData) {
    const hotel = new this.model(hotelData);
    return await hotel.save();
  }

  async update(id, updateData) {
    return await this.model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async search(searchTerm) {
    return await this.model.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { location: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    });
  }

  async filterByPrice(minPrice, maxPrice) {
    return await this.model.find({
      price: { $gte: minPrice, $lte: maxPrice }
    });
  }

  async filterByRating(minRating) {
    return await this.model.find({
      rating: { $gte: minRating }
    });
  }

  async addReview(hotelId, reviewData) {
    const hotel = await this.model.findById(hotelId);
    hotel.reviews.push(reviewData);
    hotel.calculateAverageRating();
    return await hotel.save();
  }

  async updateAvailability(hotelId, roomsToBook) {
    const hotel = await this.model.findById(hotelId);
    if (hotel.availableRooms < roomsToBook) {
      throw new Error('Not enough rooms available');
    }
    hotel.availableRooms -= roomsToBook;
    return await hotel.save();
  }
}

module.exports = HotelRepository;
