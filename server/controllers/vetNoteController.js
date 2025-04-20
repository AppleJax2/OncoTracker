const VetNote = require('../models/VetNote');
const Pet = require('../models/Pet');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create Vet Note (only for verified vets, for pets linked to them)
exports.createVetNote = catchAsync(async (req, res, next) => {
  const petId = req.params.petId || req.body.pet;
  const vetId = req.user.id; // Logged-in user must be the vet

  if (!petId) {
    return next(new AppError('Pet ID is required to add a note.', 400));
  }
  if (!req.body.note || req.body.note.trim() === '') {
      return next(new AppError('Note content cannot be empty.', 400));
  }

  // 1. Find the pet and verify the vet is linked
  const pet = await Pet.findById(petId);
  if (!pet) {
    return next(new AppError('No pet found with that ID', 404));
  }
  if (!pet.vet || pet.vet.toString() !== vetId) {
    return next(new AppError('You can only add notes for pets linked to your account.', 403));
  }

  // 2. Prepare note data
  const noteData = {
    pet: petId,
    vet: vetId,
    note: req.body.note,
  };

  // 3. Create the vet note
  const newNote = await VetNote.create(noteData);

  res.status(201).json({
    status: 'success',
    data: {
      vetNote: newNote
    }
  });
});

// Get Vet Notes for a specific Pet (only for the linked vet)
exports.getVetNotesForPet = catchAsync(async (req, res, next) => {
  const petId = req.params.petId;
  const vetId = req.user.id;

  if (!petId) {
    return next(new AppError('Pet ID is required to retrieve vet notes.', 400));
  }

  // 1. Find the pet and verify the vet is linked
  const pet = await Pet.findById(petId);
  if (!pet) {
    return next(new AppError('No pet found with that ID', 404));
  }
  if (!pet.vet || pet.vet.toString() !== vetId) {
    // Note: Owners should never even hit this endpoint due to route restrictions
    return next(new AppError('You can only view notes for pets linked to your account.', 403));
  }

  // 2. Fetch vet notes for the pet, sorted by creation date descending
  const vetNotes = await VetNote.find({ pet: petId, vet: vetId }).sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: vetNotes.length,
    data: {
      vetNotes
    }
  });
});

// Update Vet Note (only the vet who created it)
exports.updateVetNote = catchAsync(async (req, res, next) => {
  const noteId = req.params.noteId;
  const vetId = req.user.id;

  if (!req.body.note || req.body.note.trim() === '') {
    return next(new AppError('Note content cannot be empty.', 400));
  }

  const note = await VetNote.findById(noteId);

  if (!note) {
    return next(new AppError('No note found with that ID', 404));
  }

  // Authorization: Only the vet who wrote the note can update it
  if (note.vet.toString() !== vetId) {
    return next(new AppError('You do not have permission to update this note.', 403));
  }

  note.note = req.body.note;
  note.updatedAt = Date.now(); // Manually update timestamp if needed, though mongoose handles it
  await note.save({ validateBeforeSave: true });

  res.status(200).json({
    status: 'success',
    data: {
      vetNote: note
    }
  });
});

// Delete Vet Note (only the vet who created it)
exports.deleteVetNote = catchAsync(async (req, res, next) => {
  const noteId = req.params.noteId;
  const vetId = req.user.id;

  const note = await VetNote.findById(noteId);

  if (!note) {
    return next(new AppError('No note found with that ID', 404));
  }

  // Authorization: Only the vet who wrote the note can delete it
  if (note.vet.toString() !== vetId) {
    return next(new AppError('You do not have permission to delete this note.', 403));
  }

  await VetNote.findByIdAndDelete(noteId);

  res.status(204).json({
    status: 'success',
    data: null
  });
}); 