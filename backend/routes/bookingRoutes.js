const express = require('express');
const {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  getAllBookings
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');
const { bookingValidation, idValidation, validate } = require('../middleware/validation');
const Booking = require('../models/Booking');

const router = express.Router();

// All booking routes require authentication
router.use(protect);

router.post('/', bookingValidation, validate, createBooking);
router.get('/my-bookings', getUserBookings);
router.get('/:id', idValidation, validate, getBookingById);
router.patch('/:id/cancel', idValidation, validate, cancelBooking);

// Admin only
router.get('/', authorize('admin'), getAllBookings);

router.put('/:id/status', authorize('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('hotel user');
    res.json({ booking });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error: error.message });
  }
});

module.exports = router;
