const Submission = require('../models/Submission');
const Study = require('../models/Study');

// @desc    Create a new submission
// @route   POST /api/submissions
// @access  Public (with study access token)
exports.createSubmission = async (req, res) => {
  try {
    const {
      studyId,
      accessToken,
      symptoms,
      customResponses,
      additionalNotes,
      submittedBy,
      deviceInfo,
      location,
      offlineSubmitted,
      timestamp
    } = req.body;
    
    // Verify study exists and access token is valid
    const study = await Study.findById(studyId);
    if (!study) {
      return res.status(404).json({ msg: 'Study not found' });
    }
    
    if (study.accessToken !== accessToken) {
      return res.status(401).json({ msg: 'Invalid access token' });
    }
    
    // Check if study is active
    if (study.status !== 'active') {
      return res.status(400).json({ msg: 'This study is no longer active' });
    }
    
    // Create new submission
    const newSubmission = new Submission({
      study: studyId,
      symptoms,
      customResponses,
      additionalNotes,
      submittedBy,
      deviceInfo,
      location,
      offlineSubmitted,
      // Use provided timestamp for offline submissions, otherwise use server time
      timestamp: offlineSubmitted ? timestamp : Date.now()
    });
    
    const submission = await newSubmission.save();
    
    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get submissions for a study by access token (for owners)
// @route   GET /api/submissions/study/:accessToken
// @access  Public (with study access token)
exports.getOwnerSubmissions = async (req, res) => {
  try {
    // Find study by access token
    const study = await Study.findOne({ accessToken: req.params.accessToken });
    if (!study) {
      return res.status(404).json({ msg: 'Study not found or invalid access token' });
    }
    
    // Check if study is active
    if (study.status !== 'active') {
      return res.status(400).json({ msg: 'This study is no longer active' });
    }
    
    // Get submissions for this study
    const submissions = await Submission.find({ 
      study: study._id,
      'submittedBy.role': 'owner' // Only show owner's own submissions
    })
      .sort({ timestamp: -1 })
      .limit(30); // Limit to recent submissions
    
    res.json(submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get a single submission by ID
// @route   GET /api/submissions/:id
// @access  Private
exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    
    // Check if submission exists
    if (!submission) {
      return res.status(404).json({ msg: 'Submission not found' });
    }
    
    // Check if user owns the related study
    const study = await Study.findById(submission.study);
    if (!study) {
      return res.status(404).json({ msg: 'Associated study not found' });
    }
    
    if (study.veterinarian.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(submission);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Submission not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Update a submission (admin/vet only)
// @route   PUT /api/submissions/:id
// @access  Private
exports.updateSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    
    // Check if submission exists
    if (!submission) {
      return res.status(404).json({ msg: 'Submission not found' });
    }
    
    // Check if user owns the related study
    const study = await Study.findById(submission.study);
    if (!study) {
      return res.status(404).json({ msg: 'Associated study not found' });
    }
    
    if (study.veterinarian.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Update fields (only certain fields can be updated)
    const {
      symptoms,
      customResponses,
      additionalNotes,
      verified
    } = req.body;
    
    if (symptoms) submission.symptoms = symptoms;
    if (customResponses) submission.customResponses = customResponses;
    if (additionalNotes) submission.additionalNotes = additionalNotes;
    if (verified !== undefined) {
      submission.verified = verified;
      submission.verifiedBy = {
        id: req.user.id,
        name: req.user.name,
        timestamp: Date.now()
      };
    }
    
    await submission.save();
    
    res.json(submission);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Submission not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Delete a submission (admin/vet only)
// @route   DELETE /api/submissions/:id
// @access  Private
exports.deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    
    // Check if submission exists
    if (!submission) {
      return res.status(404).json({ msg: 'Submission not found' });
    }
    
    // Check if user owns the related study
    const study = await Study.findById(submission.study);
    if (!study) {
      return res.status(404).json({ msg: 'Associated study not found' });
    }
    
    if (study.veterinarian.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    await submission.deleteOne();
    
    res.json({ msg: 'Submission removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Submission not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Get aggregate symptom data for a study
// @route   GET /api/submissions/aggregate/:studyId
// @access  Private
exports.getAggregateData = async (req, res) => {
  try {
    // Check if study exists and user has access
    const study = await Study.findById(req.params.studyId);
    if (!study) {
      return res.status(404).json({ msg: 'Study not found' });
    }
    
    if (study.veterinarian.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Get all submissions for this study
    const submissions = await Submission.find({ study: req.params.studyId })
      .sort({ timestamp: 1 });
    
    // Organize submissions by date for time series
    const submissionsByDate = {};
    const symptomsByDate = {};
    
    study.symptoms.forEach(symptom => {
      symptomsByDate[symptom.name] = [];
    });
    
    submissions.forEach(submission => {
      const date = new Date(submission.timestamp).toISOString().split('T')[0];
      
      if (!submissionsByDate[date]) {
        submissionsByDate[date] = 0;
      }
      submissionsByDate[date]++;
      
      // Collect symptom ratings by date
      submission.symptoms.forEach(symptom => {
        if (symptomsByDate[symptom.name]) {
          symptomsByDate[symptom.name].push({
            date,
            rating: symptom.rating,
            timestamp: submission.timestamp
          });
        }
      });
    });
    
    // Format data for time series visualization
    const timeSeriesData = {
      submissionCounts: Object.keys(submissionsByDate).map(date => ({
        date,
        count: submissionsByDate[date]
      })),
      symptomRatings: Object.keys(symptomsByDate).map(symptomName => ({
        name: symptomName,
        data: symptomsByDate[symptomName]
      }))
    };
    
    res.json(timeSeriesData);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Study not found' });
    }
    res.status(500).send('Server error');
  }
};

// @desc    Bulk sync offline submissions
// @route   POST /api/submissions/sync
// @access  Public (with study access token)
exports.syncSubmissions = async (req, res) => {
  try {
    const { accessToken, submissions } = req.body;
    
    if (!Array.isArray(submissions) || submissions.length === 0) {
      return res.status(400).json({ msg: 'No submissions to sync' });
    }
    
    // Verify study exists and access token is valid
    const studyId = submissions[0].studyId;
    const study = await Study.findById(studyId);
    
    if (!study) {
      return res.status(404).json({ msg: 'Study not found' });
    }
    
    if (study.accessToken !== accessToken) {
      return res.status(401).json({ msg: 'Invalid access token' });
    }
    
    // Check if study is active
    if (study.status !== 'active') {
      return res.status(400).json({ msg: 'This study is no longer active' });
    }
    
    // Create submissions
    const savedSubmissions = [];
    for (const subData of submissions) {
      const newSubmission = new Submission({
        study: studyId,
        symptoms: subData.symptoms,
        customResponses: subData.customResponses,
        additionalNotes: subData.additionalNotes,
        submittedBy: subData.submittedBy,
        deviceInfo: subData.deviceInfo,
        location: subData.location,
        timestamp: subData.timestamp,
        offlineSubmitted: true,
        synced: true
      });
      
      const savedSub = await newSubmission.save();
      savedSubmissions.push(savedSub);
    }
    
    res.json({
      success: true,
      count: savedSubmissions.length,
      submissions: savedSubmissions
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}; 