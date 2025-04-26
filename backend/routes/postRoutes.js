const express = require('express');
const router = express.Router();
const { protect } = require('../controllers/authController');
const postController = require('../controllers/postController');
const { uploadMultiple } = require('../middleware/multerMiddleware');



// Create a new post
router.post('/', protect, uploadMultiple, postController.createPost);

// Upload images separately
router.post('/upload', protect, uploadMultiple, postController.uploadMultipleImages);

// Get all posts
router.get('/', postController.getPosts);

// Get posts by the logged-in author
router.get('/author', protect, postController.getPostByAuthor);

// Get a specific post
router.get('/:postId', postController.getPost);

// Update a post
router.put('/:postId', protect, postController.updatePost);

// Delete a post
router.delete('/:postId', protect, postController.deletePost);

module.exports = router;
