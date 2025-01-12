import React, { useState, useEffect } from 'react';
import { getTransactions } from '../services/api';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions();
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.amount} - {transaction.type} - {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
