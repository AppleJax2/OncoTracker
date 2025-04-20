const mongoose = require('mongoose');

const linkRequestSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function(v) {
        const user = await mongoose.model('User').findById(v);
        return user && user.role === 'owner';
      },
      message: 'Link request must originate from an owner.'
    },
    index: true,
  },
  vet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function(v) {
        const user = await mongoose.model('User').findById(v);
        // Vet must exist and be verified to receive requests
        return user && user.role === 'vet' && user.isVerified;
      },
      message: 'Link request must target a verified veterinarian.'
    },
    index: true,
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    index: true,
  },
  // Optional fields for tracking when the status changed
  requestDate: {
    type: Date,
    default: Date.now,
  },
  responseDate: {
    type: Date,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Ensure a unique pending request per owner-vet-pet combination
linkRequestSchema.index({ owner: 1, vet: 1, pet: 1, status: 1 }, { unique: true, partialFilterExpression: { status: 'pending' } });

// Middleware to update Pet.vet field upon approval
linkRequestSchema.post('findOneAndUpdate', async function(doc, next) {
  // 'this' refers to the query in findOneAndUpdate
  const update = this.getUpdate();
  if (update && update.$set && update.$set.status === 'approved') {
    try {
      const Pet = mongoose.model('Pet');
      // Need the original document to get pet and vet IDs
      const request = await this.model.findOne(this.getQuery());
      if (request) {
        await Pet.findByIdAndUpdate(request.pet, { vet: request.vet });
        // Optionally, set responseDate
        await this.model.updateOne(this.getQuery(), { responseDate: new Date() });
      }
    } catch (error) {
      console.error('Error updating Pet vet linkage:', error);
      // Handle error appropriately
    }
  }
  next();
});

// Prevent creating a new request if the pet is already linked to the requested vet
linkRequestSchema.pre('save', async function(next) {
  const Pet = mongoose.model('Pet');
  const pet = await Pet.findById(this.pet);
  if (pet && pet.vet && pet.vet.equals(this.vet)) {
    const err = new Error('This pet is already linked to the selected veterinarian.');
    err.status = 400; // Bad Request
    return next(err);
  }
  next();
});

const LinkRequest = mongoose.model('LinkRequest', linkRequestSchema);

module.exports = LinkRequest; 