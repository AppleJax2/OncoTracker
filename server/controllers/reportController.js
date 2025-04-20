const Report = require('../models/Report');
const Pet = require('../models/Pet');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create Report (only for owners, for their own pets)
exports.createReport = catchAsync(async (req, res, next) => {
  const petId = req.params.petId || req.body.pet; // Allow pet ID from route or body
  const ownerId = req.user.id;

  if (!petId) {
    return next(new AppError('Pet ID is required to submit a report.', 400));
  }

  // 1. Find the pet and verify ownership
  const pet = await Pet.findById(petId);
  if (!pet) {
    return next(new AppError('No pet found with that ID', 404));
  }
  if (pet.owner.toString() !== ownerId) {
    return next(new AppError('You can only submit reports for your own pets.', 403));
  }
  if (!pet.isActive) {
      return next(new AppError('Cannot submit reports for an archived pet.', 400));
  }

  // 2. Prepare report data
  const reportData = {
    ...req.body,
    pet: petId,
    reportedBy: ownerId,
    scaleType: pet.treatmentType, // Automatically set scale based on pet's treatment
    reportDate: req.body.reportDate || new Date() // Allow specific date or default to now
  };

  // Remove fields that shouldn't be set directly by owner
  delete reportData.owner; // Should not be set here

  // 3. Create the report
  const newReport = await Report.create(reportData);

  // Post-save middleware in Report model handles updating Pet.nextReportDueDate

  res.status(201).json({
    status: 'success',
    data: {
      report: newReport
    }
  });
});

// Get Reports for a specific Pet
// Owners can get reports for their own pets
// Vets can get reports for linked pets
exports.getReportsForPet = catchAsync(async (req, res, next) => {
  const petId = req.params.petId;

  if (!petId) {
    return next(new AppError('Pet ID is required to retrieve reports.', 400));
  }

  // 1. Find the pet and verify access permission
  const pet = await Pet.findById(petId);
  if (!pet) {
    return next(new AppError('No pet found with that ID', 404));
  }

  // Authorization check:
  if (req.user.role === 'owner' && pet.owner.toString() !== req.user.id) {
    return next(new AppError('You do not have permission to view reports for this pet.', 403));
  }
  if (req.user.role === 'vet' && (!pet.vet || pet.vet.toString() !== req.user.id)) {
    return next(new AppError('You are not linked to this pet and cannot view its reports.', 403));
  }

  // 2. Fetch reports for the pet, sorted by date descending
  // Add filtering/pagination later if needed
  const reports = await Report.find({ pet: petId }).sort({ reportDate: -1 });

  res.status(200).json({
    status: 'success',
    results: reports.length,
    data: {
      reports
    }
  });
});

// Get a single report (less common, but potentially useful)
exports.getReport = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.reportId).populate('pet'); // Populate pet to check access

  if (!report) {
    return next(new AppError('No report found with that ID', 404));
  }

  // Authorization check (similar to getReportsForPet)
  const pet = report.pet;
  if (req.user.role === 'owner' && pet.owner.toString() !== req.user.id) {
    return next(new AppError('You do not have permission to view this report.', 403));
  }
  if (req.user.role === 'vet' && (!pet.vet || pet.vet.toString() !== req.user.id)) {
    return next(new AppError('You are not linked to this pet and cannot view this report.', 403));
  }

  res.status(200).json({
    status: 'success',
    data: {
      report
    }
  });
});

// Update Report (Generally, reports shouldn't be updateable by users after submission)
// If needed, restrict updates to admins or within a very short time window.
// For MVP, disabling update functionality for owners/vets.
exports.updateReport = (req, res, next) => {
  return next(new AppError('Updating reports is not permitted.', 403));
};

// Delete Report (Generally, reports shouldn't be deleteable by users)
// If needed, restrict to admins.
// For MVP, disabling delete functionality for owners/vets.
exports.deleteReport = (req, res, next) => {
  return next(new AppError('Deleting reports is not permitted.', 403));
}; 