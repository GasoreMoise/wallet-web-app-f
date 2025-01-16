const Notification = require('../models/Notification');

// Fetch notifications for the logged-in user
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
  }
};

// Mark a specific notification as read
const markNotificationAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(400).json({ message: 'Failed to mark notification as read', error: error.message });
  }
};

// Delete a specific notification
const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete notification', error: error.message });
  }
};
// Create a specific notification
const createNotification = async (req, res) => {
    try {
        const newNotification = await Notification.create({
            user: req.user.id,
            message: req.body.message,
            // other notification details here
        });
        res.status(201).json(newNotification);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getNotifications, markNotificationAsRead, deleteNotification, createNotification };
