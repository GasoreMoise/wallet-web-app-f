const Transaction = require('../models/Transaction');

// Get a summary report
const getSummaryReport = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalIncome = await Transaction.aggregate([
      { $match: { user: userId, amount: { $gte: 0 } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const totalExpense = await Transaction.aggregate([
      { $match: { user: userId, amount: { $lt: 0 } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.status(200).json({
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate summary report', error: error.message });
  }
  
};
const getReport = async (req, res) => {
  const { startDate, endDate, category, type } = req.query; // Extract query parameters

  const filter = { user: req.user._id };

  // Apply filters if provided
  if (startDate) {
    filter.date = { ...filter.date, $gte: new Date(startDate) };
  }

  if (endDate) {
    filter.date = { ...filter.date, $lte: new Date(endDate) };
  }

  if (category) {
    filter.category = category;
  }

  if (type) {
    filter.type = type;
  }

  try {
    const transactions = await Transaction.find(filter).populate('category');

    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    res.status(200).json({
      transactions,
      total,
      count: transactions.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch report', error: error.message });
  }
};


module.exports = { getSummaryReport, getReport };

