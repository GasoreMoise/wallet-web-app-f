import axios from 'axios';

// Create an Axios instance to make requests to the backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Base URL for your backend
  timeout: 10000,
});

// You can define common API requests here
export const getTransactions = async () => {
  try {
    const response = await api.get('/transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const response = await api.post('/transactions', transactionData);
    return response.data;
  } catch (error) {
    console.error('Error creating transaction:', error);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
  }
};

export default api;
