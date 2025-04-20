const mongoose = require('mongoose');

// Define a sub-schema for individual symptom entries within a report
const reportEntrySchema = new mongoose.Schema({
  symptom: {
    type: String,
    required: true,
    trim: true,
    // Consider defining an enum based on simplified VCOG terms later
  },
  grade: {
    type: Number,
    required: true,
    min: 0, // Normal / No symptom
    max: 4, // Grade 4 (Severe, potentially life-threatening from VCOG perspective)
    // Grade 5 (Death) is handled implicitly by pet status or lack of reports
  },
  notes: { // Optional owner notes specific to this symptom
    type: String,
    trim: true,
    maxlength: [500, 'Symptom notes cannot exceed 500 characters'],
  },
}, { _id: false }); // Don't create separate IDs for sub-documents unless needed

const reportSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: [true, 'Report must be associated with a pet'],
    index: true,
  },
  reportDate: {
    type: Date,
    required: [true, 'Report date is required'],
    default: Date.now,
    index: true,
  },
  // Link to the user who submitted the report (should always be the owner)
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function(v) {
        const user = await mongoose.model('User').findById(v);
        return user && user.role === 'owner';
      },
      message: 'Reports can only be submitted by users with the role \'owner\'.'
    },
  },
  // Indicates which VCOG scale set is relevant (Chemo vs. Radiation might have different common symptoms)
  scaleType: {
    type: String,
    required: true,
    enum: ['chemo', 'radiation'],
    lowercase: true,
  },
  // Array of symptom entries based on the simplified VCOG criteria
  entries: {
    type: [reportEntrySchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 50 entries'] // Basic validation
  },
  // Simple overall wellbeing score from the owner
  overallWellbeing: {
    type: Number,
    min: 1,
    max: 5,
    // Optional, but helpful quick indicator
  },
  // General notes for the entire report
  ownerNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Overall report notes cannot exceed 1000 characters'],
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

function arrayLimit(val) {
  return val.length <= 50; // Arbitrary limit, adjust as needed
}

// Middleware to potentially update Pet.nextReportDueDate after report submission
reportSchema.post('save', async function(doc, next) {
  try {
    const Pet = mongoose.model('Pet');
    const pet = await Pet.findById(doc.pet);
    if (pet && pet.reportingSchedule !== 'manual') {
      const now = new Date();
      let nextDueDate = new Date(doc.reportDate); // Start from the report date

      switch (pet.reportingSchedule) {
        case 'daily':
          nextDueDate.setDate(nextDueDate.getDate() + 1);
          break;
        case 'every_3_days':
          nextDueDate.setDate(nextDueDate.getDate() + 3);
          break;
        case 'weekly':
          nextDueDate.setDate(nextDueDate.getDate() + 7);
          break;
      }
      // Only update if the calculated date is in the future relative to now
      // and different from the current pet.nextReportDueDate
      if (nextDueDate > now && (!pet.nextReportDueDate || nextDueDate.toISOString() !== pet.nextReportDueDate.toISOString())) {
         // Set time to start of day for consistency
         nextDueDate.setHours(0, 0, 0, 0);
         pet.nextReportDueDate = nextDueDate;
         await pet.save({ validateBeforeSave: false }); // Avoid re-running pet pre-save hooks unnecessarily
      }
    }
  } catch (error) {
    console.error('Error updating next report due date:', error);
    // Decide if the error should halt the process or just be logged
  }
  next();
});

// Add index for efficient querying by pet and date
reportSchema.index({ pet: 1, reportDate: -1 });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report; 