const express = require('express');
const router = express.Router();
const {
    getNotifications,
    markAsRead,
    getUnreadNotifications
} = require('../controllers/notificationController');

// Get all notifications for a user
router.get('/notifications', getNotifications);

// Get unread notifications for a user
router.get('/notifications/unread', getUnreadNotifications);

// Mark a notification as read
router.put('/notifications/:notificationId/read', markAsRead);

module.exports = router;
