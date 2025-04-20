const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    index: true, // Index for faster queries
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false, // Do not return password by default
  },
  role: {
    type: String,
    required: true,
    enum: ['owner', 'vet'],
    default: 'owner',
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  // Vet specific fields
  clinicName: {
    type: String,
    trim: true,
    // Only required if role is 'vet'
    required: function() { return this.role === 'vet'; }
  },
  isVerified: {
    type: Boolean,
    default: false, // Vets must be verified (manually for MVP scope)
    // Only relevant if role is 'vet'
    required: function() { return this.role === 'vet'; }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  toJSON: { virtuals: true }, // Ensure virtual properties are included when converting to JSON
  toObject: { virtuals: true }
});

// Virtual property for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Do not save passwordConfirm field if it exists (though we don't define it here)
  // this.passwordConfirm = undefined; // Example if using password confirm field

  // If modifying password and not creating a new user, set passwordChangedAt
  if (!this.isNew) {
    this.passwordChangedAt = Date.now() - 1000; // Subtract 1s to ensure token is created after change
  }
  next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if password was changed after token was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

// NOTE: Password reset token generation logic would typically go here
// For MVP simplicity, we might omit the full email-based reset flow initially.

const User = mongoose.model('User', userSchema);

module.exports = User; 