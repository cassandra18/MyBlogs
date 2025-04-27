const asyncHandler = require("express-async-handler");

const Post = require("../models/blogPostSchema");
const { response } = require('express');
const { findByIdAndDelete } = require('../models/commentsSchema');


// Define a PostController object
const postController = {
  // Create a method to handle creating a blog post
  createPost: asyncHandler(async (req, res) => {
    const { title, content, category, tags } = req.body;
  
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);
  
    if (!title || !content || !category || !tags) {
      res.status(400);
      throw new Error("All fields should be filled!");
    }
  
    const titleExist = await Post.findOne({ title });
    if (titleExist) {
      res.status(400);
      throw new Error("Title already exists");
    }
  
    const imagePaths = req.files ? req.files.map(file => `uploads/${file.filename}`) : [];
  
    const newPost = await Post.create({
      title,
      content,
      authorId: req.user._id,
      authorName: req.user.username,
      category,
      tags,
      imagePaths,
    });
  
     
    if (newPost) {
      res.status(201).json({ success:true, post: newPost });
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  }),
  
  // Get all posts
  getPosts: asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('category', 'name').populate('tags', 'name').populate('authorId', 'username');

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

    const post = await Post.findById(postId).populate('category', 'name').populate('tags', 'name').populate('authorId', 'username');

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
    const { title, content, images, category, tags, imagePaths } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(postId, {
      title,
      content,
      images,
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
