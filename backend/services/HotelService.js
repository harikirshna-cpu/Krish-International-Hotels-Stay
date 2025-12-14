const HotelRepository = require('../repositories/HotelRepository');
const Hotel = require('../models/Hotel');
const { ApiError } = require('../utils/errorHandler');

const hotelRepository = new HotelRepository(Hotel);

class HotelService {
  async getAllHotels(filters = {}, options = {}) {
    const { search, minPrice, maxPrice, minRating, location } = filters;
    
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    return await hotelRepository.findAll(query, options);
  }

  async getHotelById(id) {
    const hotel = await hotelRepository.findById(id);
    if (!hotel) {
      throw new ApiError(404, 'Hotel not found');
    }
    return hotel;
  }

  async createHotel(hotelData) {
    return await hotelRepository.create(hotelData);
  }

  async updateHotel(id, updateData) {
    const hotel = await hotelRepository.update(id, updateData);
    if (!hotel) {
      throw new ApiError(404, 'Hotel not found');
    }
    return hotel;
  }

  async deleteHotel(id) {
    const hotel = await hotelRepository.delete(id);
    if (!hotel) {
      throw new ApiError(404, 'Hotel not found');
    }
    return hotel;
  }

  async addReview(hotelId, userId, reviewData) {
    const review = {
      user: userId,
      ...reviewData
    };
    
    return await hotelRepository.addReview(hotelId, review);
  }

  async searchHotels(searchTerm) {
    return await hotelRepository.search(searchTerm);
  }

  async getRecommendedHotels(limit = 6) {
    return await hotelRepository.findAll(
      { rating: { $gte: 4.5 } },
      { limit, sort: '-rating' }
    );
  }
}

module.exports = new HotelService();
