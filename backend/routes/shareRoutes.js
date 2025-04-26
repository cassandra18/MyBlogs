const express = require('express');
const router = express.Router();
const {
    trackShare,
    getSharesByPost,
    getSharesByUser,
    deleteShare
} = require('../controllers/shareController');

// Track a share for a post
router.post('/share', trackShare);

// Get all shares for a post
router.get('/share/:postId', getSharesByPost);

// Get all shares by a user
router.get('/share/user/:userId', getSharesByUser);

// Delete a specific share
router.delete('/share/:shareId', deleteShare);

module.exports = router;
