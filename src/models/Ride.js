const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  passenger: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  driver: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null,
  },
  pickupLocation: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  dropoffLocation: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  distance: Number,
  estimatedDuration: Number,
  estimatedFare: Number,
  actualFare: Number,
  paymentMethod: {
    type: String,
    enum: ['wallet', 'card', 'cash'],
    default: 'wallet',
  },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'picked_up', 'in_progress', 'completed', 'cancelled'],
    default: 'requested',
  },
  rideType: {
    type: String,
    enum: ['bike', 'car', 'van'],
    required: true,
  },
  rating: {
    passengerRating: Number,
    driverRating: Number,
  },
  startTime: Date,
  endTime: Date,
  cancellationReason: String,
  cancelledBy: String,
  specialRequests: String,
  promoCode: String,
  discount: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model('Ride', rideSchema);
