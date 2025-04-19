const mongoose = require('mongoose');
const crypto = require('crypto');

const StudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  veterinarian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  treatmentType: {
    type: String,
    enum: ['radiation', 'chemo', 'other'],
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  duration: {
    type: Number, // in days
    required: true,
    min: 1,
    max: 365
  },
  submissionFrequency: {
    type: String,
    enum: ['daily', 'twice_daily', 'weekly', 'custom'],
    default: 'daily'
  },
  customFrequency: {
    type: String
  },
  symptoms: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    scale: {
      type: String,
      enum: ['rtog', 'vcog_ctcae', 'custom'],
      required: true
    },
    minValue: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      default: 5
    }
  }],
  customQuestions: [{
    question: {
      type: String,
      required: true
    },
    responseType: {
      type: String,
      enum: ['text', 'number', 'boolean', 'scale'],
      default: 'text'
    },
    options: [String], // For predefined options if needed
    required: {
      type: Boolean,
      default: false
    }
  }],
  status: {
    type: String,
    enum: ['active', 'completed', 'terminated'],
    default: 'active'
  },
  accessToken: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(16).toString('hex')
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for study URL
StudySchema.virtual('shareableUrl').get(function() {
  return `/study/${this.accessToken}`;
});

// Generate QR code data (later can be used with a QR code library)
StudySchema.virtual('qrCodeData').get(function() {
  // Fix for path-to-regexp error - avoid template literals with URLs
  const baseUrl = process.env.FRONTEND_URL || 'https://oncotracker.netlify.app';
  return baseUrl + '/study/' + this.accessToken;
});

module.exports = mongoose.model('Study', StudySchema); 