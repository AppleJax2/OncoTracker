const Pet = require('../models/Pet');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Factory function for creating handlers (optional but can reduce repetition)
const createOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

const getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
  let query = Model.findById(req.params.id);
  if (popOptions) query = query.populate(popOptions);
  const doc = await query;

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

const updateOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the modified document
    runValidators: true // Run schema validators on update
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

const deleteOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  // 204 No Content
  res.status(204).json({
    status: 'success',
    data: null
  });
});

// --- Pet Specific Controllers ---

// Middleware to set owner ID for creating pets
exports.setOwnerId = (req, res, next) => {
  // Allow setting owner manually only if admin (not implemented yet)
  // Otherwise, set owner to the logged-in user (must be 'owner')
  if (!req.body.owner) req.body.owner = req.user.id;
  next();
};

// Create Pet (only for owners)
exports.createPet = catchAsync(async (req, res, next) => {
  // Ensure the owner ID in the body matches the logged-in user
  if (req.body.owner !== req.user.id) {
    return next(new AppError('You can only create pets for your own account.', 403));
  }
  // Vet linkage is handled separately via LinkRequest
  if (req.body.vet) {
      delete req.body.vet;
  }

  const newPet = await Pet.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      pet: newPet
    }
  });
});

// Get Pet (Owners can get their own, Vets can get linked pets)
exports.getPet = catchAsync(async (req, res, next) => {
  const pet = await Pet.findById(req.params.id).populate('owner', 'firstName lastName email').populate('vet', 'firstName lastName email clinicName'); // Populate owner and vet details

  if (!pet) {
    return next(new AppError('No pet found with that ID', 404));
  }

  // Authorization check:
  // Owner can access their own pet
  // Vet can access pets linked to them
  if (req.user.role === 'owner' && pet.owner._id.toString() !== req.user.id) {
    return next(new AppError('You do not have permission to view this pet.', 403));
  }
  if (req.user.role === 'vet' && (!pet.vet || pet.vet._id.toString() !== req.user.id)) {
    return next(new AppError('You are not linked to this pet and cannot view details.', 403));
  }

  res.status(200).json({
    status: 'success',
    data: {
      pet
    }
  });
});

// Get All Pets (Owners get their own, Vets get linked pets)
exports.getAllPets = catchAsync(async (req, res, next) => {
  let query;
  if (req.user.role === 'owner') {
    query = Pet.find({ owner: req.user.id, isActive: true });
  } else if (req.user.role === 'vet') {
    // Vets see their linked active pets - Populate owner info
    query = Pet.find({ vet: req.user.id, isActive: true })
               .populate('owner', 'firstName lastName email'); 
  } else {
      // Should not happen due to route protection, but handle defensively
      return next(new AppError('Invalid user role for accessing pets.', 403));
  }

  // Add filtering, sorting, pagination later if needed
  const pets = await query.sort({ createdAt: -1 }); // Sort by newest first

  res.status(200).json({
    status: 'success',
    results: pets.length,
    data: {
      pets
    }
  });
});

// Update Pet (Owners can update their own)
exports.updatePet = catchAsync(async (req, res, next) => {
  const pet = await Pet.findById(req.params.id);

  if (!pet) {
    return next(new AppError('No pet found with that ID', 404));
  }

  // Authorization: Only the owner can update their pet's details
  if (pet.owner.toString() !== req.user.id) {
    return next(new AppError('You do not have permission to update this pet.', 403));
  }

  // Prevent owner from directly changing the linked vet - use Linking mechanism
  if (req.body.vet) {
      delete req.body.vet;
  }
  // Prevent owner from changing isActive status directly? Maybe allow archiving?
  // For now, allow owners to update isActive (effectively archiving)
  // if (req.body.isActive !== undefined && req.user.role !== 'admin') { // Example if restricting
  //   delete req.body.isActive;
  // }

  const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      pet: updatedPet
    }
  });
});

// Delete Pet (Owners can delete their own - consider soft delete/archiving instead)
// Using isActive flag for now, so this might just set isActive = false
exports.deletePet = catchAsync(async (req, res, next) => {
  const pet = await Pet.findById(req.params.id);

  if (!pet) {
    return next(new AppError('No pet found with that ID', 404));
  }

  // Authorization: Only the owner can delete (archive) their pet
  if (pet.owner.toString() !== req.user.id) {
    return next(new AppError('You do not have permission to delete this pet.', 403));
  }

  // Soft delete by setting isActive to false
  pet.isActive = false;
  await pet.save({ validateBeforeSave: false });

  // Or Hard delete:
  // await Pet.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
}); 