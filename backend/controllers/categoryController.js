const asyncHandler = require('express-async-handler');
const Category = require('../models/categorySchema');

// Create a new category
const createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    // Check if the category already exists
    const categoryExist = await Category.findOne({ name });

    if (categoryExist) {
        res.status(400);
        throw new Error('Category already exists');
    }

    // Create new category
    const newCategory = await Category.create({
        name,
        description
    });

    if (newCategory) {
        res.status(201).json(newCategory);
    } else {
        res.status(400);
        throw new Error('Invalid data');
    }
});

// Get all categories
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    if (categories) {
        res.status(200).json(categories);
    } else {
        res.status(500);
        throw new Error('Failed to retrieve categories');
    }
});

// Get a single category by its ID
const getCategoryById = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (category) {
        res.status(200).json(category);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

// Update a category by its ID
const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { name, description },
        { new: true }
    );

    if (updatedCategory) {
        res.status(200).json(updatedCategory);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

// Delete a category by its ID
const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (deletedCategory) {
        res.status(200).json({ message: 'Category deleted successfully' });
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
