const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const patientController = require('../controllers/patientController');

// @route   GET /api/patients
// @desc    Get all patients for current user
// @access  Private
router.get('/', auth, patientController.getPatients);

// @route   GET /api/patients/:id
// @desc    Get a single patient by ID
// @access  Private
router.get('/:id', auth, patientController.getPatientById);

// @route   POST /api/patients
// @desc    Create a new patient
// @access  Private
router.post('/', auth, patientController.createPatient);

// @route   PUT /api/patients/:id
// @desc    Update a patient
// @access  Private
router.put('/:id', auth, patientController.updatePatient);

// @route   DELETE /api/patients/:id
// @desc    Delete a patient
// @access  Private
router.delete('/:id', auth, patientController.deletePatient);

// @route   GET /api/patients/:id/studies
// @desc    Get all studies for a patient
// @access  Private
router.get('/:id/studies', auth, patientController.getPatientStudies);

// @route   PUT /api/patients/:id/archive
// @desc    Archive a patient
// @access  Private
router.put('/:id/archive', auth, patientController.archivePatient);

module.exports = router; 