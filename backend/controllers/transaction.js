const Transaction = require('../models/Transaction');

// Create a new transaction
async function createTransaction(req, res) {
  const { amount, type, description, userId } = req.body;

  const transaction = await Transaction.create({
    amount,
    type,
    description,
    userId,
  });

  res.status(201).json({ message: 'Transaction created successfully', transaction });
}

// Get all transactions
async function getTransactions(req, res) {
  const transactions = await Transaction.findAll();
  res.status(200).json(transactions);
}

module.exports = { createTransaction, getTransactions };
