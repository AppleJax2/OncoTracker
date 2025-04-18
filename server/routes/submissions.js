const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const submissionController = require('../controllers/submissionController');

// @route   POST /api/submissions
// @desc    Create a new submission
// @access  Public (with study access token)
router.post('/', submissionController.createSubmission);

// @route   GET /api/submissions/study/:accessToken
// @desc    Get submissions for a study by access token (for owners)
// @access  Public (with study access token)
router.get('/study/:accessToken', submissionController.getOwnerSubmissions);

// @route   POST /api/submissions/sync
// @desc    Bulk sync offline submissions
// @access  Public (with study access token)
router.post('/sync', submissionController.syncSubmissions);

// @route   GET /api/submissions/aggregate/:studyId
// @desc    Get aggregate symptom data for a study
// @access  Private
router.get('/aggregate/:studyId', auth, submissionController.getAggregateData);

// @route   GET /api/submissions/:id
// @desc    Get a single submission by ID
// @access  Private
router.get('/:id', auth, submissionController.getSubmissionById);

// @route   PUT /api/submissions/:id
// @desc    Update a submission (admin/vet only)
// @access  Private
router.put('/:id', auth, submissionController.updateSubmission);

// @route   DELETE /api/submissions/:id
// @desc    Delete a submission (admin/vet only)
// @access  Private
router.delete('/:id', auth, submissionController.deleteSubmission);

module.exports = router; 