const express = require('express');
const { createTransaction, getTransactions } = require('../controllers/transaction');
const router = express.Router();

// Create a new transaction
router.post('/', createTransaction);

// Get all transactions
router.get('/', getTransactions);

module.exports = router;

