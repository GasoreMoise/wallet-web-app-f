const Budget = require('../models/Budget');

// Create a new budget
const createBudget = async (req, res) => {
  const { category, amount, startDate, endDate } = req.body;

  if (!category || !amount || !startDate || !endDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const budget = await Budget.create({
      user: req.user._id,
      category,
      amount,
      startDate,
      endDate,
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create budget', error: error.message });
  }
};

// Get all budgets for the logged-in user
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id }).populate('category');
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch budgets', error: error.message });
  }
};

// Update a budget by ID
const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { amount, category } = req.body;

  if (!amount || !category) {
    return res.status(400).json({ message: 'Amount and category are required' });
  }

  try {
    const budget = await Budget.findByIdAndUpdate(
      id,
      { amount, category },
      { new: true, runValidators: true }
    );

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // Check if budget is exceeded by transactions
    const totalSpent = await Transaction.aggregate([
      { $match: { user: req.user._id, category } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
    ]);

    if (totalSpent[0]?.totalAmount > budget.amount) {
      // Create notification for exceeded budget
      await Notification.create({
        user: req.user._id,
        message: `Budget for category "${category}" has been exceeded!`,
      });
    }

    res.status(200).json(budget);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update budget', error: error.message });
  }
};

// Delete a budget by ID
const deleteBudget = async (req, res) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findByIdAndDelete(id);

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete budget', error: error.message });
  }
};

module.exports = { createBudget, getBudgets, updateBudget, deleteBudget };

