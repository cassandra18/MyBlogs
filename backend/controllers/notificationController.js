const asyncHandler = require('express-async-handler');
const Notification = require('../models/notificationSchema');
const Post = require('../models/blogPostSchema');
const Comments = require('../models/commentsSchema');
const User = require('../models/userSchema');

// Helper function to create a notification
const createNotification = asyncHandler(async (userId, type, message, relatedPostId = null, relatedCommentId = null) => {
    try {
        const notification = await Notification.create({
            user: userId,
            type,
            message,
            relatedPost: relatedPostId,
            relatedComment: relatedCommentId
        });

        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw new Error('Failed to create notification');
    }
});

// Get all notifications for a specific user
const getNotifications = asyncHandler(async (req, res) => {
    const userId = req.user.id;  // Get the user ID from the authenticated user

    const notifications = await Notification.find({ user: userId })
        .sort({ createdAt: -1 })  // Sort by creation date, most recent first
        .populate('relatedPost', 'title')  // Optionally populate the related post title
        .populate('relatedComment', 'text');  // Optionally populate the related comment text

    res.status(200).json(notifications);
});

// Mark a notification as read
const markAsRead = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;  // Get the notification ID from the request parameters

    const notification = await Notification.findById(notificationId);

    if (!notification) {
        res.status(404);
        throw new Error('Notification not found');
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read', notification });
});

// Get unread notifications for a specific user
const getUnreadNotifications = asyncHandler(async (req, res) => {
    const userId = req.user.id;  // Get the user ID from the authenticated user

    const unreadNotifications = await Notification.find({ 
        user: userId, 
        isRead: false 
    })
    .sort({ createdAt: -1 })  // Sort by creation date, most recent first
    .populate('relatedPost', 'title')  // Optionally populate the related post title
    .populate('relatedComment', 'text');  // Optionally populate the related comment text

    res.status(200).json(unreadNotifications);
});

// Helper function to generate notifications for different events

// New comment notification
const generateNewCommentNotification = async (userId, commenter, postId, postTitle) => {
    const message = `${commenter} commented on your post: "${postTitle}"`;
    return createNotification(userId, 'comment', message, postId);
};

// New like notification
const generateNewLikeNotification = async (userId, liker, postId, postTitle) => {
    const message = `${liker} liked your post: "${postTitle}"`;
    return createNotification(userId, 'like', message, postId);
};

// New rating notification
const generateNewRatingNotification = async (userId, rater, postId, postTitle) => {
    const message = `${rater} rated your post: "${postTitle}"`;
    return createNotification(userId, 'rating', message, postId);
};

// New reply notification
const generateNewReplyNotification = async (userId, replier, commentId, postTitle) => {
    const message = `${replier} replied to your comment on the post: "${postTitle}"`;
    return createNotification(userId, 'reply', message, null, commentId);
};

// New follow notification
const generateNewFollowNotification = async (userId, follower) => {
    const message = `${follower} started following you`;
    return createNotification(userId, 'follow', message);
};

module.exports = {
    createNotification,
    getNotifications,
    markAsRead,
    getUnreadNotifications,
    generateNewCommentNotification,
    generateNewLikeNotification,
    generateNewRatingNotification,
    generateNewReplyNotification,
    generateNewFollowNotification
};
