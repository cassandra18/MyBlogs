const express = require('express');
const router = express.Router();
const { authenticateUserToken }  = require('../middleware/authUserMiddleware');
const addLike = require('../controllers/likesController');

router.route('/:postId/like').post(authenticateUserToken, addLike);

module.exports = router;