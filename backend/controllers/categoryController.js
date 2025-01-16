const Category = require('../models/Category');

const getCategories = async (req, res) => {
  const categories = await Category.find({ user: req.user._id });
  res.json(categories);
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  const category = await Category.create({
    user: req.user._id,
    name,
  });

  res.status(201).json(category);
};

module.exports = { getCategories, createCategory };