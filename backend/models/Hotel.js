const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const europeanReviewSchema = new mongoose.Schema({
  name: String,
  country: String,
  rating: Number,
  comment: String
});

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hotel name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['Luxury', 'Resort', 'Business', 'Boutique', 'Beach', 'Urban'],
    default: 'Resort'
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  amenities: [{
    type: String,
    trim: true
  }],
  services: [{
    type: String,
    trim: true
  }],
  offers: [{
    type: String,
    trim: true
  }],
  europeanReviews: [europeanReviewSchema],
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  images: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    trim: true
  },
  rooms: {
    type: Number,
    default: 0,
    min: 0
  },
  availableRooms: {
    type: Number,
    default: 0,
    min: 0
  },
  reviews: [reviewSchema],
  reviewCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate average rating from reviews
hotelSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.reviewCount = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating = (sum / this.reviews.length).toFixed(1);
    this.reviewCount = this.reviews.length;
  }
};

module.exports = mongoose.model('Hotel', hotelSchema);
