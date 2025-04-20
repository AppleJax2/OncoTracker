const express = require('express');
const reportController = require('../controllers/reportController');
const { protect, restrictTo } = require('../utils/authUtils');

// By default, mergeParams allows access to parameters from parent routers (e.g., :petId from petRouter)
const router = express.Router({ mergeParams: true });

// All report routes require the user to be logged in
router.use(protect);

router
  .route('/')
  // GET /api/pets/:petId/reports - Get all reports for a specific pet (Owner or linked Vet)
  .get(reportController.getReportsForPet)
  // POST /api/pets/:petId/reports - Create a new report for a specific pet (Owner only)
  .post(restrictTo('owner'), reportController.createReport);

router
  .route('/:reportId')
  // GET /api/pets/:petId/reports/:reportId - Get a single report (Owner or linked Vet)
  .get(reportController.getReport)
  // Update/Delete are disabled for MVP
  .patch((req, res, next) => reportController.updateReport(req, res, next))
  .delete((req, res, next) => reportController.deleteReport(req, res, next));

module.exports = router; 