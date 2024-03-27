const express = require('express');
const router = express.Router();
const { authenticateUserToken }  = require('../middleware/authUserMiddleware')
const createComment = require('../controllers/commentsController');


router.route('/:postId/comment').post(authenticateUserToken, createComment);


module.exports = router;