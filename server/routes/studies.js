const express = require('express');
const router = express.Router();
const { auth, studyAccess } = require('../middleware/auth');
const studyController = require('../controllers/studyController');

// @route   GET /api/studies
// @desc    Get all studies for current user
// @access  Private
router.get('/', auth, studyController.getStudies);

// @route   GET /api/studies/active
// @desc    Get active studies for current user
// @access  Private
router.get('/active', auth, studyController.getActiveStudies);

// @route   GET /api/studies/scales
// @desc    Get all available toxicity scales
// @access  Private
router.get('/scales', auth, studyController.getToxicityScales);

// @route   GET /api/studies/access/:accessToken
// @desc    Get study data for owner view (public access)
// @access  Public
router.get('/access/:accessToken', studyController.getStudyByAccessToken);

// @route   GET /api/studies/:id
// @desc    Get a single study by ID
// @access  Private
router.get('/:id', auth, studyController.getStudyById);

// @route   POST /api/studies
// @desc    Create a new study
// @access  Private
router.post('/', auth, studyController.createStudy);

// @route   PUT /api/studies/:id
// @desc    Update a study
// @access  Private
router.put('/:id', auth, studyController.updateStudy);

// @route   PUT /api/studies/:id/complete
// @desc    Complete a study
// @access  Private
router.put('/:id/complete', auth, studyController.completeStudy);

// @route   PUT /api/studies/:id/terminate
// @desc    Terminate a study early
// @access  Private
router.put('/:id/terminate', auth, studyController.terminateStudy);

// @route   GET /api/studies/:id/submissions
// @desc    Get all submissions for a study
// @access  Private
router.get('/:id/submissions', auth, studyController.getStudySubmissions);

module.exports = router; 