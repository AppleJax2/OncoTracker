const Study = require('../models/Study');
const Patient = require('../models/Patient');
const Submission = require('../models/Submission');
const { rtogScale, vcogCtcaeScale } = require('../utils/toxicityScales');

// @desc    Get all studies for current user
// @route   GET /api/studies
// @access  Private
exports.getStudies = async (req, res) => {
  try {
    const studies = await Study.find({ veterinarian: req.user.id })
      .populate('patient', 'name species breed diagnosis')
      .sort({ createdAt: -1 });
    
    res.json(studies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get active studies for current user
// @route   GET /api/studies/active
// @access  Private
exports.getActiveStudies = async (req, res) => {
  try {
    const activeStudies = await Study.find({ 
      veterinarian: req.user.id,
      status: 'active'
    })
      .populate('patient', 'name species breed diagnosis')
      .sort({ createdAt: -1 });
    
    res.json(activeStudies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get a single study by ID
// @route   GET /api/studies/:id
// @access  Private
exports.getStudyById = async (req, res) => {
  try {
    const study = await Study.findById(req.params.id)
      .populate('patient', 'name owner species breed diagnosis treatmentType');
    
    // Check if study exists
    if (!study) {
      return res.status(404).json({ msg: 'Study not found' });
    }
    
    // Check if user owns this study
    if (study.veterinarian.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(study);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Study not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Create a new study
// @route   POST /api/studies
// @access  Private
exports.createStudy = async (req, res) => {
  try {
    const {
      title,
      patient: patientId,
      treatmentType,
      description,
      startDate,
      duration,
      submissionFrequency,
      customFrequency,
      symptoms,
      customQuestions
    } = req.body;
    
    // Verify patient exists and belongs to user
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    
    if (patient.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to create study for this patient' });
    }
    
    // Create new study
    const newStudy = new Study({
      title,
      patient: patientId,
      veterinarian: req.user.id,
      treatmentType,
      description,
      startDate: startDate || Date.now(),
      duration,
      submissionFrequency,
      customFrequency,
      symptoms,
      customQuestions
    });
    
    // Calculate end date based on duration
    if (duration) {
      const startDateObj = new Date(newStudy.startDate);
      newStudy.endDate = new Date(startDateObj.setDate(startDateObj.getDate() + duration));
    }
    
    const study = await newStudy.save();
    
    res.json(study);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update a study
// @route   PUT /api/studies/:id
// @access  Private
exports.updateStudy = async (req, res) => {
  try {
    const study = await Study.findById(req.params.id);
    
    // Check if study exists
    if (!study) {
      return res.status(404).json({ msg: 'Study not found' });
    }
    
    // Check if user owns this study
    if (study.veterinarian.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Don't allow updates to completed or terminated studies
    if (study.status !== 'active') {
      return res.status(400).json({ msg: 'Cannot update completed or terminated studies' });
    }
    
    // Update fields (only certain fields can be updated after creation)
    const {
      title,
      description,
      customQuestions,
      duration
    } = req.body;
    
    if (title) study.title = title;
    if (description) study.description = description;
    if (customQuestions) study.customQuestions = customQuestions;
    
    // Recalculate end date if duration changes
    if (duration && duration !== study.duration) {
      study.duration = duration;
      const startDateObj = new Date(study.startDate);
      study.endDate = new Date(startDateObj.setDate(startDateObj.getDate() + duration));
    }
    
    await study.save();
    
    res.json(study);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Study not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Complete a study
// @route   PUT /api/studies/:id/complete
// @access  Private
exports.completeStudy = async (req, res) => {
  try {
    const study = await Study.findById(req.params.id);
    
    // Check if study exists
    if (!study) {
      return res.status(404).json({ msg: 'Study not found' });
    }
    
    // Check if user owns this study
    if (study.veterinarian.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Check if study is active
    if (study.status !== 'active') {
      return res.status(400).json({ msg: 'Study is already completed or terminated' });
    }
    
    study.status = 'completed';
    await study.save();
    
    res.json(study);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Study not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Terminate a study early
// @route   PUT /api/studies/:id/terminate
// @access  Private
exports.terminateStudy = async (req, res) => {
  try {
    const study = await Study.findById(req.params.id);
    
    // Check if study exists
    if (!study) {
      return res.status(404).json({ msg: 'Study not found' });
    }
    
    // Check if user owns this study
    if (study.veterinarian.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Check if study is active
    if (study.status !== 'active') {
      return res.status(400).json({ msg: 'Study is already completed or terminated' });
    }
    
    // Optionally record reason for termination
    if (req.body.terminationReason) {
      study.terminationReason = req.body.terminationReason;
    }
    
    study.status = 'terminated';
    await study.save();
    
    res.json(study);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Study not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Get all submissions for a study
// @route   GET /api/studies/:id/submissions
// @access  Private
exports.getStudySubmissions = async (req, res) => {
  try {
    const study = await Study.findById(req.params.id);
    
    // Check if study exists
    if (!study) {
      return res.status(404).json({ msg: 'Study not found' });
    }
    
    // Check if user owns this study
    if (study.veterinarian.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    const submissions = await Submission.find({ study: req.params.id })
      .sort({ timestamp: -1 });
    
    res.json(submissions);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Study not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Get study data for owner view (public access)
// @route   GET /api/studies/access/:accessToken
// @access  Public
exports.getStudyByAccessToken = async (req, res) => {
  try {
    const study = await Study.findOne({ accessToken: req.params.accessToken })
      .populate('patient', 'name species breed');
    
    // Check if study exists
    if (!study) {
      return res.status(404).json({ msg: 'Study not found or invalid access token' });
    }
    
    // Check if study is active
    if (study.status !== 'active') {
      return res.status(400).json({ msg: 'This study is no longer active' });
    }
    
    // Prepare symptom scales for owner
    const symptomScales = {};
    
    for (const symptom of study.symptoms) {
      if (symptom.scale === 'rtog') {
        const category = Object.keys(rtogScale).find(key => 
          symptom.name.toLowerCase().includes(key)
        );
        
        if (category) {
          symptomScales[symptom.name] = rtogScale[category];
        }
      } else if (symptom.scale === 'vcog_ctcae') {
        const category = Object.keys(vcogCtcaeScale).find(key => 
          symptom.name.toLowerCase().includes(key)
        );
        
        if (category) {
          symptomScales[symptom.name] = vcogCtcaeScale[category];
        }
      }
    }
    
    // Return study data with symptom scales for owner
    res.json({
      studyId: study._id,
      title: study.title,
      patient: study.patient,
      treatmentType: study.treatmentType,
      description: study.description,
      symptoms: study.symptoms,
      customQuestions: study.customQuestions,
      symptomScales,
      accessToken: study.accessToken
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get all available toxicity scales
// @route   GET /api/studies/scales
// @access  Private
exports.getToxicityScales = async (req, res) => {
  try {
    res.json({
      rtog: rtogScale,
      vcog_ctcae: vcogCtcaeScale
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}; 