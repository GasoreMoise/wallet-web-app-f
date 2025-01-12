const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Transaction = sequelize.define('Transaction', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Transaction.belongsTo(User); // Each transaction belongs to a user

module.exports = Transaction;
