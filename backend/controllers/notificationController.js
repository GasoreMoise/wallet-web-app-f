const Notification = require('../models/Notification');

// Get all notifications for a user
const getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notifications);
};

// Create a notification
const createNotification = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  const notification = await Notification.create({
    user: req.user._id,
    message,
  });

  res.status(201).json(notification);
};

// Mark as read
const markNotificationAsRead = async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  res.json(notification);
};

// Delete notification
const deleteNotification = async (req, res) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);

  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  res.json({ message: 'Notification deleted successfully' });
};

module.exports = {
  getNotifications,
  createNotification,
  markNotificationAsRead,
  deleteNotification,
};

