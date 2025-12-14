const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Hotel = require('../models/Hotel');
const { protect } = require('../middleware/auth');

// Get reviews for a hotel
router.get('/hotel/:hotelId', async (req, res) => {
  try {
    const reviews = await Review.find({ hotel: req.params.hotelId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

// Create a review
router.post('/', protect, async (req, res) => {
  try {
    const { hotel, rating, comment } = req.body;

    // Check if user already reviewed this hotel
    const existingReview = await Review.findOne({ hotel, user: req.user._id });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this hotel' });
    }

    const review = new Review({
      hotel,
      user: req.user._id,
      rating,
      comment
    });

    await review.save();

    // Update hotel's average rating
    const reviews = await Review.find({ hotel });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Hotel.findByIdAndUpdate(hotel, { rating: avgRating.toFixed(1) });

    const populatedReview = await Review.findById(review._id).populate('user', 'name email');
    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(400).json({ message: 'Error creating review', error: error.message });
  }
});

// Update a review
router.put('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    // Update hotel's average rating
    const reviews = await Review.find({ hotel: review.hotel });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Hotel.findByIdAndUpdate(review.hotel, { rating: avgRating.toFixed(1) });

    const populatedReview = await Review.findById(review._id).populate('user', 'name email');
    res.json(populatedReview);
  } catch (error) {
    res.status(400).json({ message: 'Error updating review', error: error.message });
  }
});

// Delete a review
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    const hotelId = review.hotel;
    await review.deleteOne();

    // Update hotel's average rating
    const reviews = await Review.find({ hotel: hotelId });
    if (reviews.length > 0) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await Hotel.findByIdAndUpdate(hotelId, { rating: avgRating.toFixed(1) });
    } else {
      await Hotel.findByIdAndUpdate(hotelId, { rating: 0 });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
});

module.exports = router;
