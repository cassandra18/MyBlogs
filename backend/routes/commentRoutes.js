const express = require('express');
const router = express.Router();
const { createComment } = require('../controllers/commentController');  // Import the createComment controller
const { protect } = require('../controllers/authController');  // Protect middleware to ensure the user is authenticated

// Route for creating a new comment on a post
router.post('/:postId/comments', protect, createComment);  // The postId comes from the URL parameters

module.exports = router;
