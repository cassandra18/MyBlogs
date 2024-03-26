const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');


//route for search for blogs
router.get('/search', searchController.searchPosts);


module.exports = router;