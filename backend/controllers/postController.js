const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const asyncHandler = require("express-async-handler");

const Post = require("../models/blogPostSchema");
const { response } = require('express');
const { findByIdAndDelete } = require('../models/commentsSchema');

// configure the multer storage engine. It specifies that uploaded files should be stored in 'diskStorage' disk. 
const storage = multer.diskStorage({
  //set the 'uploads/' directory as the destination directory
  destination: (req, file, cb) => {
    const uploadDir = './uploads'; // Add './' to ensure the correct relative path

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },

  // Generate a unique filename for each uploaded file.
  filename: (req, file, cb) => {
    const uniqueFile = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFile);
  },
});

// Handle multiple file uploads
const uploadMultiple = multer({
  storage: storage, // the uploaded images will be stored in the diskStorage in the server
  limits: { files: 5 }, // limits the number of files to be uploaded to 5
}).array('images', 5); // images is the field name in the form for multiple file

// Define a PostController object
const postController = {
  // Create a method to handle creating a blog post
  createPost: asyncHandler(async (req, res) => {
    const { title, content, imageUrl, authorId, authorName, category, tags } = req.body;

    if (!title || !content || !authorId || !authorName || !category || !tags) {
      res.status(400);
      throw new Error("All fields should be filled!");
    }

    const titleExist = await Post.findOne({ title });
    if (titleExist) {
      res.status(400);
      throw new Error("Title already exists");
    }

    uploadMultiple(req, res, async (err) => {
      if (err) {
        res.status(400).json({ error: 'Error uploading images' });
      } else {
        // Once files are uploaded, store the paths
        const imagePaths = req.files ? req.files.map(file => `uploads/${file.filename}`) : [];

        // Create a new post after image upload
        const newPost = await Post.create({
          title,
          content,
          authorId,
          imageUrl,
          authorName,
          category,
          tags,
          imagePaths,
        });

        if (newPost) {
          res.status(201).json({
            _id: newPost.id,
            title: newPost.title,
            content: newPost.content,
            imageUrl: newPost.imageUrl,
            authorId: newPost.authorId,
            authorName: newPost.authorName,
            category: newPost.category,
            tags: newPost.tags,
            imagePaths: newPost.imagePaths,
          });
        } else {
          res.status(400);
          throw new Error("Invalid data");
        }
      }
    });
  }),

  // Get all posts
  getPosts: asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });

    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(500);
      throw new Error('Internal server error');
    }
  }),

  // Upload multiple images and return their paths
  uploadMultipleImages: (req, res) => {
    const imagePaths = req.files.map(file => `uploads/${file.filename}`);
    res.json({ imagePaths });
  },

  // Get a specific post by its ID
  getPost: asyncHandler(async (req, res) => {
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404);
      throw new Error('Blog not found');
    }
  }),

  // Get all posts by a specific author
  getPostByAuthor: asyncHandler(async (req, res) => {
    try {
      const posts = await Post.find({ authorId: req.user.id });
      res.json(posts);
    } catch (error) {
      console.error('Error fetching user blogs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }),

  // Update a post
  updatePost: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const { title, content, imageUrl, category, tags, imagePaths } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(postId, {
      title,
      content,
      imageUrl,
      category,
      tags,
      imagePaths,
    }, { new: true }); // To return the updated document
    
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404);
      throw new Error('Blog not found');
    }
  }),

  // Delete a post
  deletePost: asyncHandler(async (req, res) => {
    const postId = req.params.postId;

    try {
      const deletedPost = await Post.findByIdAndDelete(postId);

      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      } else {
        res.status(200).json({ message: 'Post deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }),
};

module.exports = postController;
