const express = require('express');
const router = express.Router();
const {
    createTag,
    getTags,
    getTagById,
    updateTag,
    deleteTag
} = require('../controllers/tagController');

// Create a new tag
router.post('/tag', createTag);

// Get all tags
router.get('/tags', getTags);

// Get a tag by its ID
router.get('/tag/:tagId', getTagById);

// Update a tag by its ID
router.put('/tag/:tagId', updateTag);

// Delete a tag by its ID
router.delete('/tag/:tagId', deleteTag);

module.exports = router;
