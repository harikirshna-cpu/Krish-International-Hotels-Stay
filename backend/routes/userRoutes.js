const express = require('express');
const { addToFavorites, removeFromFavorites, getFavorites } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/favorites', getFavorites);
router.post('/favorites', addToFavorites);
router.delete('/favorites/:hotelId', removeFromFavorites);

// Admin routes
router.get('/', authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

router.put('/:id/role', authorize('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
});

router.delete('/:id', authorize('admin'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router;
