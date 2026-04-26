const { validationResult, body } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').notEmpty().withMessage('Phone is required'),
  handleValidationErrors,
];

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

const validateRideRequest = [
  body('pickupLocation').notEmpty().withMessage('Pickup location is required'),
  body('dropoffLocation').notEmpty().withMessage('Dropoff location is required'),
  body('rideType').isIn(['bike', 'car', 'van']).withMessage('Invalid ride type'),
  handleValidationErrors,
];

const validateReview = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().optional().isLength({ max: 500 }).withMessage('Comment too long'),
  handleValidationErrors,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateRideRequest,
  validateReview,
  handleValidationErrors,
};
