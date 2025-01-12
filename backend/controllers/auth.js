const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET; // From .env file

// Register user
async function registerUser(req, res) {
  const { username, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await User.create({ username, email, password: hashedPassword });

  res.status(201).json({ message: 'User created successfully', user });
}

// Login user
async function loginUser(req, res) {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: 'User not found' });

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  // Generate JWT
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful', token });
}

module.exports = { registerUser, loginUser };
