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
router.post('/', createCategory);

// Get all categories
router.get('/', getCategories);

// Get a category by its ID
router.get('/:categoryId', getCategoryById);

// Update a category by its ID
router.put('/:categoryId', updateCategory);

// Delete a category by its ID
router.delete('/:categoryId', deleteCategory);

module.exports = router;
