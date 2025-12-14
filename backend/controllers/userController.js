const UserRepository = require('../repositories/UserRepository');
const User = require('../models/User');

const userRepository = new UserRepository(User);

exports.addToFavorites = async (req, res, next) => {
  try {
    const { hotelId } = req.body;
    const user = await userRepository.addToFavorites(req.user._id, hotelId);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.removeFromFavorites = async (req, res, next) => {
  try {
    const { hotelId } = req.params;
    const user = await userRepository.removeFromFavorites(req.user._id, hotelId);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    const favorites = await userRepository.getFavorites(req.user._id);
    
    res.status(200).json({
      success: true,
      data: favorites
    });
  } catch (error) {
    next(error);
  }
};
