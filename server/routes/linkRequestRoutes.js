const express = require('express');
const linkRequestController = require('../controllers/linkRequestController');
const { protect, restrictTo } = require('../utils/authUtils');

const router = express.Router();

// All routes require login
router.use(protect);

// Route for owners to find vets
router.get('/find-vets', restrictTo('owner'), linkRequestController.findVets);

// Route for owners to create a link request
router.post('/', restrictTo('owner'), linkRequestController.createLinkRequest);

// Routes for vets to manage requests
router.get('/pending', restrictTo('vet'), linkRequestController.getPendingRequests);
router.patch('/:requestId/respond', restrictTo('vet'), linkRequestController.respondToLinkRequest);

module.exports = router; 