const express = require('express');
const {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
  addReview,
  searchHotels,
  getRecommendedHotels
} = require('../controllers/hotelController');
const { protect, authorize } = require('../middleware/auth');
const { idValidation, reviewValidation, validate } = require('../middleware/validation');

const router = express.Router();

router.get('/', getAllHotels);
router.get('/search', searchHotels);
router.get('/recommended', getRecommendedHotels);
router.get('/:id', idValidation, validate, getHotelById);

// Protected routes
router.post('/', protect, authorize('admin'), createHotel);
router.put('/:id', protect, authorize('admin'), idValidation, validate, updateHotel);
router.delete('/:id', protect, authorize('admin'), idValidation, validate, deleteHotel);

// Reviews
router.post('/:id/reviews', protect, idValidation, reviewValidation, validate, addReview);

module.exports = router;
