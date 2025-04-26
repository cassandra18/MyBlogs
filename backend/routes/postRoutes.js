const express = require('express');
const router = express.Router();
const { protect } = require('../controllers/authController');  // Protect middleware to ensure user is authenticated
const postController = require('../controllers/postController');  // Import the post controller

// Route for creating a new post
router.post('/', protect, postController.createPost);  // Protect the route to ensure only authenticated users can create posts

// Route for fetching all posts
router.get('/', postController.getPosts);  // Public access to all posts

// Route for fetching a specific post by its ID
router.get('/:postId', postController.getPost);  // Public access to a single post

// Route for fetching all posts by a specific author (authenticated user)
router.get('/author', protect, postController.getPostByAuthor);  // Protect the route to ensure user is authenticated

// Route for updating a post
router.put('/:postId', protect, postController.updatePost);  // Protect the route to ensure user is authenticated

// Route for deleting a post
router.delete('/:postId', protect, postController.deletePost);  // Protect the route to ensure only the author/admin can delete

// Route for uploading multiple images (for post creation or editing)
router.post('/upload', protect, postController.uploadMultipleImages);

module.exports = router;
