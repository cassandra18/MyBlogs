const express = require('express');
const router = express.Router();
const { authenticateToken }  = require('../middleware/authUserMiddleware');
const addLike = require('../controllers/likesController');

router.route('/:postId/like').post(authenticateToken, addLike);

module.exports = router;