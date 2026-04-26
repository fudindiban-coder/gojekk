const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  ride: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ride',
    required: true,
  },
  reviewer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  reviewee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    maxlength: 500,
  },
  categories: {
    cleanliness: Number,
    communication: Number,
    drivingSkills: Number,
    vehicleCondition: Number,
  },
  reviewType: {
    type: String,
    enum: ['driver', 'passenger'],
    required: true,
  },
  response: {
    text: String,
    createdAt: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
