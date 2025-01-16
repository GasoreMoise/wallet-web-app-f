const express = require('express');
const { getSummaryReport } = require('../controllers/reportsController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route for summary report
router.get('/summary', protect, getSummaryReport);

module.exports = router;
