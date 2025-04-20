const LinkRequest = require('../models/LinkRequest');
const User = require('../models/User');
const Pet = require('../models/Pet');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Search for Verified Veterinarians (for Owners)
exports.findVets = catchAsync(async (req, res, next) => {
  const { searchTerm } = req.query;

  if (!searchTerm || searchTerm.trim() === '') {
    return next(new AppError('Please provide a search term (vet name or clinic name).', 400));
  }

  // Search by first name, last name, or clinic name (case-insensitive)
  const searchRegex = new RegExp(searchTerm, 'i');
  const vets = await User.find({
    role: 'vet',
    isVerified: true,
    $or: [
      { firstName: searchRegex },
      { lastName: searchRegex },
      { clinicName: searchRegex }
    ]
  }).select('firstName lastName clinicName _id'); // Only return necessary info

  res.status(200).json({
    status: 'success',
    results: vets.length,
    data: {
      vets
    }
  });
});

// Create Link Request (Owner initiates)
exports.createLinkRequest = catchAsync(async (req, res, next) => {
  const { vetId, petId } = req.body;
  const ownerId = req.user.id;

  if (!vetId || !petId) {
    return next(new AppError('Veterinarian ID and Pet ID are required.', 400));
  }

  // 1. Verify the pet belongs to the owner
  const pet = await Pet.findOne({ _id: petId, owner: ownerId });
  if (!pet) {
    return next(new AppError('Pet not found or does not belong to you.', 404));
  }

  // 2. Verify the target vet exists, is a vet, and is verified
  const vet = await User.findById(vetId);
  if (!vet || vet.role !== 'vet' || !vet.isVerified) {
    return next(new AppError('Invalid or unverified veterinarian selected.', 400));
  }

  // 3. Check if pet is already linked to this vet
  if (pet.vet && pet.vet.equals(vetId)) {
      return next(new AppError('This pet is already linked to this veterinarian.', 400));
  }

  // 4. Check for existing *pending* request (Model pre-save hook also checks this)
  const existingPendingRequest = await LinkRequest.findOne({
      owner: ownerId,
      vet: vetId,
      pet: petId,
      status: 'pending'
  });
  if (existingPendingRequest) {
      return next(new AppError('A pending link request already exists for this pet and veterinarian.', 400));
  }

  // 5. Create the request
  const newRequest = await LinkRequest.create({
    owner: ownerId,
    vet: vetId,
    pet: petId,
    status: 'pending' // Explicitly set, though it's the default
  });

  res.status(201).json({
    status: 'success',
    data: {
      linkRequest: newRequest
    }
  });
});

// Get Pending Link Requests (for Vets)
exports.getPendingRequests = catchAsync(async (req, res, next) => {
  const vetId = req.user.id;

  const requests = await LinkRequest.find({ vet: vetId, status: 'pending' })
    .populate('owner', 'firstName lastName email')
    .populate('pet', 'name species breed')
    .sort({ requestDate: 1 }); // Sort oldest first

  res.status(200).json({
    status: 'success',
    results: requests.length,
    data: {
      linkRequests: requests
    }
  });
});

// Respond to Link Request (Vet approves/rejects)
exports.respondToLinkRequest = catchAsync(async (req, res, next) => {
  const requestId = req.params.requestId;
  const vetId = req.user.id;
  const { status } = req.body; // Expecting 'approved' or 'rejected'

  if (!status || !['approved', 'rejected'].includes(status)) {
    return next(new AppError('Invalid status provided. Must be \'approved\' or \'rejected\'.', 400));
  }

  // 1. Find the request and ensure it belongs to this vet and is pending
  const request = await LinkRequest.findOne({
    _id: requestId,
    vet: vetId,
    status: 'pending'
  });

  if (!request) {
    return next(new AppError('Pending link request not found or you do not have permission to respond.', 404));
  }

  // 2. Update the request status
  // Using findByIdAndUpdate to trigger the post-findOneAndUpdate hook in the model
  const updatedRequest = await LinkRequest.findByIdAndUpdate(requestId, {
      $set: { status: status, responseDate: new Date() }
  }, {
      new: true,
      runValidators: true
  });

  // The post-hook in LinkRequest model handles updating the Pet.vet field if approved.

  res.status(200).json({
    status: 'success',
    data: {
      linkRequest: updatedRequest
    }
  });
}); 