const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../utils/authUtils'); // Import protect middleware

const router = express.Router();

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Example of a protected route to get current user info
// This could be moved to a userRoutes file later if more user-specific routes are added
router.get('/me', protect, (req, res) => {
  // The 'protect' middleware adds the user object to the request
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
});

// Add routes for password reset later if needed

module.exports = router; 