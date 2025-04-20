const User = require('../models/User');
const catchAsync = require('../utils/catchAsync'); // Assuming a utility to wrap async functions
const AppError = require('../utils/appError');
const { createSendToken } = require('../utils/authUtils');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, practice } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      practice
    });

    // Save user to DB
    await user.save();

    // Create and return JWT
    const payload = {
      id: user.id
    };

    // Use process.env instead of imported JWT_SECRET
    const jwtSecret = process.env.JWT_SECRET || 'oncotracker_secure_jwt_secret_2025';
    
    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            practice: user.practice,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists && password is correct
  // Need to explicitly select password as it's excluded by default
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getCurrentUser = async (req, res) => {
  try {
    // req.user is set from the auth middleware
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, firstName, lastName, role, clinicName } = req.body;

  // Basic validation (more robust validation can be added)
  if (!email || !password || !passwordConfirm || !firstName || !lastName || !role) {
    return next(new AppError('Please provide email, password, confirm password, first name, last name, and role.', 400));
  }

  if (password !== passwordConfirm) {
    return next(new AppError('Passwords do not match', 400));
  }

  // Ensure role is valid
  if (!['owner', 'vet'].includes(role)) {
    return next(new AppError('Invalid role specified.', 400));
  }

  // Check if clinicName is provided for vet role
  if (role === 'vet' && !clinicName) {
    return next(new AppError('Clinic name is required for veterinarian accounts.', 400));
  }

  const userData = {
    email,
    password, // Hashing happens in pre-save middleware
    firstName,
    lastName,
    role,
  };

  if (role === 'vet') {
    userData.clinicName = clinicName;
    // isVerified defaults to false in the model for vets
  }

  // Create user (password will be hashed by Mongoose middleware)
  const newUser = await User.create(userData);

  // Send token and user data (excluding password)
  createSendToken(newUser, 201, res);
});

exports.logout = (req, res) => {
  // Clear the JWT cookie
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000), // Expire in 10 seconds
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.status(200).json({ status: 'success' });
};

// Add other auth-related functions like password reset later if needed 