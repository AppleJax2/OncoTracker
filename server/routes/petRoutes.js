const express = require('express');
const petController = require('../controllers/petController');
const { protect, restrictTo } = require('../utils/authUtils');

// Import the report router
const reportRouter = require('./reportRoutes');
// Import the vet note router
const vetNoteRouter = require('./vetNoteRoutes');

const router = express.Router();

// Mount the report router for nested routes like /api/pets/:petId/reports
router.use('/:petId/reports', reportRouter);
// Mount the vet note router for nested routes like /api/pets/:petId/vetnotes
router.use('/:petId/vetnotes', vetNoteRouter);

// All routes below this require the user to be logged in
router.use(protect);

router
  .route('/')
  .get(petController.getAllPets) // Owners get their pets, Vets get linked pets
  .post(restrictTo('owner'), petController.setOwnerId, petController.createPet); // Only owners can create pets

router
  .route('/:id')
  .get(petController.getPet) // Owners get their own, Vets get linked
  .patch(restrictTo('owner'), petController.updatePet) // Only owners can update
  .delete(restrictTo('owner'), petController.deletePet); // Only owners can delete (archive)

// Nested routes for reports associated with a pet could go here
// Example: router.use('/:petId/reports', reportRouter);

module.exports = router; 