const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  study: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Study',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  symptoms: [{
    symptomId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    notes: String
  }],
  customResponses: [{
    questionId: {
      type: String,
      required: true
    },
    question: String,
    response: mongoose.Schema.Types.Mixed
  }],
  additionalNotes: {
    type: String,
    trim: true
  },
  submittedBy: {
    name: String,
    role: {
      type: String,
      enum: ['owner', 'vet', 'system'],
      default: 'owner'
    }
  },
  deviceInfo: {
    browser: String,
    os: String,
    device: String
  },
  location: {
    latitude: Number,
    longitude: Number
  },
  offlineSubmitted: {
    type: Boolean,
    default: false
  },
  synced: {
    type: Boolean,
    default: true
  }
});

// Indexes
SubmissionSchema.index({ study: 1, timestamp: -1 });

module.exports = mongoose.model('Submission', SubmissionSchema); 