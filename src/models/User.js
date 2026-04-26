const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+(([.-]?\w+)*@\w+(([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'driver', 'admin'],
    default: 'user',
  },
  profilePhoto: {
    type: String,
    default: null,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  vehicle: {
    type: {
      type: String,
      enum: ['bike', 'car', 'van'],
    },
    brand: String,
    model: String,
    color: String,
    plateNumber: String,
    verificationDocument: String,
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
  },
  documents: {
    licenseNumber: String,
    licenseExpiry: Date,
    licensePhoto: String,
    insuranceDocument: String,
  },
  wallet: {
    balance: {
      type: Number,
      default: 0,
    },
    totalTopup: {
      type: Number,
      default: 0,
    },
  },
  rating: {
    average: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Get JWT token
userSchema.methods.getSignedJwt = function() {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: '30d' }
  );
};

module.exports = mongoose.model('User', userSchema);
