const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

/**
 * @desc    Get user settings
 * @route   GET /api/users/settings
 * @access  Private
 */
exports.getUserSettings = catchAsync(async (req, res, next) => {
  // Get user from database (exclude password field which is already excluded by default)
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  
  // Return relevant user settings
  const settings = {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    fullName: user.fullName // Virtual property
  };
  
  // Add vet-specific fields if applicable
  if (user.role === 'vet') {
    settings.clinicName = user.clinicName;
    settings.isVerified = user.isVerified;
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      settings
    }
  });
});

/**
 * @desc    Update user settings
 * @route   PUT /api/users/settings
 * @access  Private
 */
exports.updateUserSettings = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, clinicName } = req.body;
  
  // Only allow updating these specific fields
  const updateData = {};
  
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  if (email) updateData.email = email;
  
  // Only allow clinic name update if user is a vet
  const user = await User.findById(req.user.id);
  if (user.role === 'vet' && clinicName) {
    updateData.clinicName = clinicName;
  }
  
  // Update user with validated data
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    updateData,
    {
      new: true, // Return updated document
      runValidators: true, // Run model validators
    }
  );
  
  if (!updatedUser) {
    return next(new AppError('User not found', 404));
  }
  
  // Return updated settings
  const settings = {
    id: updatedUser._id,
    email: updatedUser.email,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    role: updatedUser.role,
    fullName: updatedUser.fullName // Virtual property
  };
  
  // Add vet-specific fields if applicable
  if (updatedUser.role === 'vet') {
    settings.clinicName = updatedUser.clinicName;
    settings.isVerified = updatedUser.isVerified;
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      settings
    }
  });
});

/**
 * @desc    Change user password
 * @route   PUT /api/users/password
 * @access  Private
 */
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, passwordConfirm } = req.body;
  
  // Check if required fields are provided
  if (!currentPassword || !newPassword || !passwordConfirm) {
    return next(new AppError('Please provide current password, new password, and password confirmation', 400));
  }
  
  // Check if new password and confirm match
  if (newPassword !== passwordConfirm) {
    return next(new AppError('New password and confirmation do not match', 400));
  }
  
  // Get user with password
  const user = await User.findById(req.user.id).select('+password');
  
  // Check if current password is correct
  const isCorrectPassword = await user.correctPassword(currentPassword, user.password);
  if (!isCorrectPassword) {
    return next(new AppError('Current password is incorrect', 401));
  }
  
  // Update password
  user.password = newPassword;
  await user.save(); // Use save to trigger password hashing in pre-save middleware
  
  // Return success message (don't send token - user stays logged in)
  res.status(200).json({
    status: 'success',
    message: 'Password updated successfully'
  });
}); 