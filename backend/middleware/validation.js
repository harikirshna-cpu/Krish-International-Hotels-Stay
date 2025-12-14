const { body, param, query, validationResult } = require('express-validator');
const { ApiError } = require('../utils/errorHandler');

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    return next(new ApiError(400, errorMessages));
  }
  next();
};

exports.registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().trim()
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

exports.bookingValidation = [
  body('hotel').notEmpty().withMessage('Hotel ID is required'),
  body('checkInDate').isISO8601().withMessage('Valid check-in date is required'),
  body('checkOutDate').isISO8601().withMessage('Valid check-out date is required'),
  body('guests').isInt({ min: 1 }).withMessage('At least 1 guest is required'),
  body('paymentMethod').isIn(['credit_card', 'debit_card', 'paypal', 'stripe']).withMessage('Invalid payment method')
];

exports.reviewValidation = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required')
];

exports.idValidation = [
  param('id').isMongoId().withMessage('Invalid ID format')
];
