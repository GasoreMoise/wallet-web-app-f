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

module.exports = { getSummaryReport };
