const express = require('express');
const router = express.Router();
const { authenticateToken }  = require('../middleware/authUserMiddleware')
const createComment = require('../controllers/commentsController');


router.route('/:postId/comment').post(authenticateToken, createComment);


module.exports = router;