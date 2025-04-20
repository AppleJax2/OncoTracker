const mongoose = require('mongoose');

const vetNoteSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
    index: true,
  },
  vet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function(v) {
        const user = await mongoose.model('User').findById(v);
        return user && user.role === 'vet';
      },
      message: 'Vet notes must be associated with a user with the role \'vet\'.'
    },
    index: true,
  },
  note: {
    type: String,
    required: [true, 'Note content is required'],
    trim: true,
    maxlength: [2000, 'Vet note cannot exceed 2000 characters'],
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Index for efficient querying by pet and date
vetNoteSchema.index({ pet: 1, createdAt: -1 });

const VetNote = mongoose.model('VetNote', vetNoteSchema);

module.exports = VetNote; 