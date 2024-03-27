const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const { authenticateToken } = require('../middleware/authAdminMiddleware');
const { authenticateUserToken } = require('../middleware/authUserMiddleware');


//Route for creating post
router.route('/create-post').post(authenticateToken, postController.createPost);

//Route for handling image uploads
router.route('/upload-image').post(authenticateToken, postController.uploadMultipleImages);

//Route for getting all the posts
router.route('/get-all-posts').get(postController.getPosts);

//Route for getting posts by a specific author
router.route('/post-by-author').get(authenticateUserToken, postController.getPostByAuthor)

//GEt post by id
router.route('/:postId').get(postController.getPost).put(authenticateToken, postController.updatePost);

//delete post
router.route('/:postId').delete(authenticateToken, postController.deletePost);

module.exports = router;