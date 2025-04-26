const asyncHandler = require('express-async-handler');
const Tag = require('../models/tagSchema');  // Import the Tag model

// Create a new tag
const createTag = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // Check if the tag already exists
    const existingTag = await Tag.findOne({ name: name.toLowerCase() });

    if (existingTag) {
        res.status(400);
        throw new Error('Tag already exists');
    }

    // Create a new tag
    const tag = await Tag.create({
        name: name.toLowerCase()
    });

    res.status(201).json(tag);
});

// Get all tags
const getTags = asyncHandler(async (req, res) => {
    const tags = await Tag.find();

    if (tags.length > 0) {
        res.status(200).json(tags);
    } else {
        res.status(404);
        throw new Error("No tags found");
    }
});

// Get a single tag by its ID
const getTagById = asyncHandler(async (req, res) => {
    const { tagId } = req.params;

    const tag = await Tag.findById(tagId);

    if (tag) {
        res.status(200).json(tag);
    } else {
        res.status(404);
        throw new Error('Tag not found');
    }
});

// Update an existing tag
const updateTag = asyncHandler(async (req, res) => {
    const { tagId } = req.params;
    const { name } = req.body;

    const updatedTag = await Tag.findByIdAndUpdate(
        tagId,
        { name: name.toLowerCase() },
        { new: true }  // Return the updated tag
    );

    if (updatedTag) {
        res.status(200).json(updatedTag);
    } else {
        res.status(404);
        throw new Error('Tag not found');
    }
});

// Delete a tag
const deleteTag = asyncHandler(async (req, res) => {
    const { tagId } = req.params;

    const tag = await Tag.findByIdAndDelete(tagId);

    if (tag) {
        res.status(200).json({ message: 'Tag deleted successfully' });
    } else {
        res.status(404);
        throw new Error('Tag not found');
    }
});

module.exports = {
    createTag,
    getTags,
    getTagById,
    updateTag,
    deleteTag
};
