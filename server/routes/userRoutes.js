const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../utils/authUtils'); // Import protect middleware

const router = express.Router();

// All user routes should be protected
router.use(protect);

// Get and update user settings
router.get('/settings', userController.getUserSettings);
router.put('/settings', userController.updateUserSettings);

// Change password
router.put('/password', userController.updatePassword);

module.exports = router; 