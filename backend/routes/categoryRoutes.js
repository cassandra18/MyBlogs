const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

// Create a new category
router.post('/categories', createCategory);

// Get all categories
router.get('/categories', getCategories);

// Get a category by its ID
router.get('/categories/:categoryId', getCategoryById);

// Update a category by its ID
router.put('/categories/:categoryId', updateCategory);

// Delete a category by its ID
router.delete('/categories/:categoryId', deleteCategory);

module.exports = router;
