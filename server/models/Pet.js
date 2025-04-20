const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Pet must belong to an owner'],
    index: true,
  },
  vet: { // Optional link to a veterinarian
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Validate that the referenced user actually has the 'vet' role
    validate: {
      validator: async function(v) {
        if (!v) return true; // Allow null/undefined vet
        const user = await mongoose.model('User').findById(v);
        return user && user.role === 'vet';
      },
      message: 'Assigned veterinarian must have the role \'vet\'.'
    },
    index: true,
  },
  name: {
    type: String,
    required: [true, 'Pet name is required'],
    trim: true,
  },
  species: {
    type: String,
    required: [true, 'Species is required'],
    enum: ['dog', 'cat'],
    lowercase: true,
  },
  breed: {
    type: String,
    trim: true,
    default: 'Unknown / Mixed',
  },
  dateOfBirth: {
    type: Date,
  },
  // Storing weight might be better as a sub-document array if tracking changes
  // For MVP, keep it simple as the last known weight
  weightKg: {
    type: Number,
    min: [0, 'Weight must be a positive number'],
  },
  diagnosis: {
    type: String,
    trim: true,
  },
  treatmentType: {
    type: String,
    required: [true, 'Treatment type is required'],
    enum: ['chemo', 'radiation'],
    lowercase: true,
  },
  reportingSchedule: {
    type: String,
    enum: ['daily', 'every_3_days', 'weekly', 'manual'], // Added 'manual' for flexibility
    default: 'manual',
  },
  nextReportDueDate: {
    type: Date,
    index: true, // Index for potential reminder queries
  },
  isActive: {
    type: Boolean, // Allows vets/owners to archive pets
    default: true,
    index: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for calculating age (approximate)
petSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return 'Unknown';
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  // Simple age string
  if (age < 1) {
    const months = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24 * 30.44)); // Avg days/month
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    return `${age} year${age !== 1 ? 's' : ''}`;
  }
});

// Middleware to ensure only owners can create pets for themselves
// and vet linkage is handled separately (via LinkRequest model)
petSchema.pre('save', function(next) {
  // For now, primarily focused on setting initial next report date if needed
  // Linking logic will be handled more explicitly in controllers/routes
  if (this.isNew && this.reportingSchedule !== 'manual' && !this.nextReportDueDate) {
    // Set initial due date based on schedule (simple example)
    const now = new Date();
    if (this.reportingSchedule === 'daily') {
      this.nextReportDueDate = new Date(now.setDate(now.getDate() + 1));
    } else if (this.reportingSchedule === 'every_3_days') {
      this.nextReportDueDate = new Date(now.setDate(now.getDate() + 3));
    } else if (this.reportingSchedule === 'weekly') {
      this.nextReportDueDate = new Date(now.setDate(now.getDate() + 7));
    }
  }
  next();
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet; 