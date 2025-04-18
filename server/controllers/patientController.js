const Patient = require('../models/Patient');
const Study = require('../models/Study');

// @desc    Get all patients for current user
// @route   GET /api/patients
// @access  Private
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get a single patient by ID
// @route   GET /api/patients/:id
// @access  Private
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    // Check if patient exists
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    
    // Check if user owns this patient
    if (patient.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Create a new patient
// @route   POST /api/patients
// @access  Private
exports.createPatient = async (req, res) => {
  try {
    const {
      name,
      owner,
      species,
      breed,
      dateOfBirth,
      diagnosis,
      treatmentType,
      notes
    } = req.body;
    
    // Create new patient
    const newPatient = new Patient({
      name,
      owner,
      species,
      breed,
      dateOfBirth,
      diagnosis,
      treatmentType,
      notes,
      createdBy: req.user.id
    });
    
    const patient = await newPatient.save();
    
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update a patient
// @route   PUT /api/patients/:id
// @access  Private
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    // Check if patient exists
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    
    // Check if user owns this patient
    if (patient.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Update fields
    const {
      name,
      owner,
      species,
      breed,
      dateOfBirth,
      diagnosis,
      treatmentType,
      notes,
      isArchived
    } = req.body;
    
    if (name) patient.name = name;
    if (owner) patient.owner = owner;
    if (species) patient.species = species;
    if (breed) patient.breed = breed;
    if (dateOfBirth) patient.dateOfBirth = dateOfBirth;
    if (diagnosis) patient.diagnosis = diagnosis;
    if (treatmentType) patient.treatmentType = treatmentType;
    if (notes) patient.notes = notes;
    if (isArchived !== undefined) patient.isArchived = isArchived;
    
    await patient.save();
    
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Delete a patient
// @route   DELETE /api/patients/:id
// @access  Private
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    // Check if patient exists
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    
    // Check if user owns this patient
    if (patient.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Check if there are any active studies for this patient
    const activeStudies = await Study.countDocuments({
      patient: req.params.id,
      status: 'active'
    });
    
    if (activeStudies > 0) {
      return res.status(400).json({ 
        msg: 'Cannot delete patient with active studies. Please complete or terminate all studies first.' 
      });
    }
    
    await patient.deleteOne();
    
    res.json({ msg: 'Patient removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Get all studies for a patient
// @route   GET /api/patients/:id/studies
// @access  Private
exports.getPatientStudies = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    // Check if patient exists
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    
    // Check if user owns this patient
    if (patient.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    const studies = await Study.find({ patient: req.params.id })
      .sort({ createdAt: -1 });
    
    res.json(studies);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Archive a patient
// @route   PUT /api/patients/:id/archive
// @access  Private
exports.archivePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    // Check if patient exists
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    
    // Check if user owns this patient
    if (patient.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    patient.isArchived = true;
    await patient.save();
    
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    res.status(500).send('Server error');
  }
}; 