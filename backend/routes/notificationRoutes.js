const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
  getNotifications,
  createNotification,
  markNotificationAsRead,
  deleteNotification,
} = require('../controllers/notificationController');

const router = express.Router();

router.route('/').get(protect, getNotifications).post(protect, createNotification);
router.route('/:id').put(protect, markNotificationAsRead).delete(protect, deleteNotification);

module.exports = router;



