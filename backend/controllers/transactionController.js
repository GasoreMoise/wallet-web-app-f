const Transaction = require('../models/Transaction');
const Notification = require('../models/Notification');
const Budget = require('../models/Budget');

// Fetch all transactions for the logged-in user
const getTransactions = async (req, res) => {
  const { startDate, endDate, category, sortBy, page, limit } = req.query;

  const query = { user: req.user._id };

  // Add date range filter
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  // Add category filter
  if (category) {
    query.category = category;
  }

  // Default pagination values
  const currentPage = parseInt(page) || 1;
  const itemsPerPage = parseInt(limit) || 10;
  const skip = (currentPage - 1) * itemsPerPage;

  try {
    const transactions = await Transaction.find(query)
      .populate('category')
      .sort(sortBy || '-date') // Default sort by date in descending order
      .skip(skip)
      .limit(itemsPerPage);

    const totalTransactions = await Transaction.countDocuments(query);

    res.status(200).json({
      transactions,
      currentPage,
      totalPages: Math.ceil(totalTransactions / itemsPerPage),
      totalTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
  }
};


// Create a new transaction
const createTransaction = async (req, res) => {
  const { amount, description, category, date } = req.body;

  if (!amount || !description || !category || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const transaction = await Transaction.create({
      user: req.user._id,
      amount,
      description,
      category,
      date,
    });

    // Check for budget limit
    const budget = await Budget.findOne({ user: req.user._id, category });

    if (budget && budget.amount < amount) {
      // Create notification for budget exceeded
      await Notification.create({
        user: req.user._id,
        message: `Budget for category "${category}" exceeded! Transaction amount: ${amount}`,
      });
    }

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create transaction', error: error.message });
  }
};

// Update an existing transaction by ID
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, description, category, date } = req.body;

  if (!amount || !description || !category || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, description, category, date },
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update transaction', error: error.message });
  }
};

// Delete a transaction by ID
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete transaction', error: error.message });
  }
};

module.exports = { getTransactions, createTransaction, updateTransaction, deleteTransaction };




