const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json()); // To parse JSON data in the request body
app.use(cors()); // To allow cross-origin requests

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello, Wallet Web Application!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api', transactionRoutes); // Use the /api prefix for all routes in transactionRoutes
