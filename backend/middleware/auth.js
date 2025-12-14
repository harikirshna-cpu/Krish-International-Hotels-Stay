const User = require('../models/User');
const { verifyToken } = require('../utils/jwt');
const { ApiError } = require('../utils/errorHandler');

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ApiError(401, 'Not authorized to access this route'));
    }

    try {
      const decoded = verifyToken(token);
      req.user = await User.findById(decoded.id);
      
      if (!req.user) {
        return next(new ApiError(401, 'User not found'));
      }

      next();
    } catch (error) {
      return next(new ApiError(401, 'Invalid token'));
    }
  } catch (error) {
    next(error);
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'User role not authorized to access this route'));
    }
    next();
  };
};
