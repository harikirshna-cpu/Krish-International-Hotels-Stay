const hotelService = require('../services/HotelService');

exports.getAllHotels = async (req, res, next) => {
  try {
    const { search, minPrice, maxPrice, minRating, location, page, limit, sort } = req.query;
    
    const filters = { search, minPrice, maxPrice, minRating, location };
    const options = { page: Number(page) || 1, limit: Number(limit) || 10, sort };
    
    const result = await hotelService.getAllHotels(filters, options);
    
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

exports.getHotelById = async (req, res, next) => {
  try {
    const hotel = await hotelService.getHotelById(req.params.id);
    res.status(200).json({
      success: true,
      data: hotel
    });
  } catch (error) {
    next(error);
  }
};

exports.createHotel = async (req, res, next) => {
  try {
    const hotel = await hotelService.createHotel(req.body);
    res.status(201).json({
      success: true,
      data: hotel
    });
  } catch (error) {
    next(error);
  }
};

exports.updateHotel = async (req, res, next) => {
  try {
    const hotel = await hotelService.updateHotel(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: hotel
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    await hotelService.deleteHotel(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Hotel deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.addReview = async (req, res, next) => {
  try {
    const hotel = await hotelService.addReview(
      req.params.id,
      req.user._id,
      req.body
    );
    res.status(201).json({
      success: true,
      data: hotel
    });
  } catch (error) {
    next(error);
  }
};

exports.searchHotels = async (req, res, next) => {
  try {
    const { q } = req.query;
    const hotels = await hotelService.searchHotels(q);
    res.status(200).json({
      success: true,
      data: hotels
    });
  } catch (error) {
    next(error);
  }
};

exports.getRecommendedHotels = async (req, res, next) => {
  try {
    const hotels = await hotelService.getRecommendedHotels();
    res.status(200).json({
      success: true,
      data: hotels
    });
  } catch (error) {
    next(error);
  }
};
