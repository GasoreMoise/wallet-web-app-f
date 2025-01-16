const express = require('express');
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction, // Added deleteTransaction controller
} = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route for fetching and creating transactions
router.route('/').get(protect, getTransactions).post(protect, createTransaction);

// Route for updating and deleting a transaction by ID
router.route('/:id').put(protect, updateTransaction).delete(protect, deleteTransaction); // Added DELETE route

module.exports = router;



