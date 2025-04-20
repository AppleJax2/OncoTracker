const express = require('express');
const vetNoteController = require('../controllers/vetNoteController');
const { protect, restrictTo } = require('../utils/authUtils');

// By default, mergeParams allows access to parameters from parent routers (e.g., :petId)
const router = express.Router({ mergeParams: true });

// All vet note routes require the user to be logged in and be a verified vet
router.use(protect);
router.use(restrictTo('vet')); // Ensures only vets can access these routes (verified check included in restrictTo)

router
  .route('/')
  // GET /api/pets/:petId/vetnotes - Get all vet notes for a specific pet
  .get(vetNoteController.getVetNotesForPet)
  // POST /api/pets/:petId/vetnotes - Create a new vet note for a specific pet
  .post(vetNoteController.createVetNote);

router
  .route('/:noteId')
  // Note: No GET /:noteId needed as notes are fetched in bulk via GET /
  // PATCH /api/pets/:petId/vetnotes/:noteId - Update a specific vet note
  .patch(vetNoteController.updateVetNote)
  // DELETE /api/pets/:petId/vetnotes/:noteId - Delete a specific vet note
  .delete(vetNoteController.deleteVetNote);

module.exports = router; 