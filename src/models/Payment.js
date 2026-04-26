const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  ride: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ride',
    default: null,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['ride', 'wallet_topup', 'refund'],
    required: true,
  },
  method: {
    type: String,
    enum: ['wallet', 'card', 'cash'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'cancelled'],
    default: 'pending',
  },
  transactionId: String,
  stripePaymentIntentId: String,
  description: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
