const express = require('express');
const {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} = require('../controllers/budgetController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route for creating and fetching budgets
router.route('/').post(protect, createBudget).get(protect, getBudgets);

// Route for updating and deleting a budget by ID
router.route('/:id').put(protect, updateBudget).delete(protect, deleteBudget);

module.exports = router;



