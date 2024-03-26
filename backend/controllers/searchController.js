const asyncHandler = require('express-async-handler');

const Post = require('../models/blogPostSchema');
const mongoose = require('mongoose');

const searchController = {
    searchPosts: asyncHandler(async (req, res) => {
        const { title, content, author, category, tags, startDate, endDate, sortBy, sortOrder } = req.query;

        //Build the search query based on the provided parameters

        const searchQuery = {};

        if(title) {
            searchQuery.title = new RegExp(`\\s*${title}$`, 'i'); //case insensitie title search
        }

        if(content) {
            searchQuery.content = new RegExp(content, 'i'); //case insensitie content search
        }

        if(author) {
            if (mongoose.Types.ObjectId.isValid(author)) {
                searchQuery.authorId = author;
            } else{
                searchQuery.authorName = new RegExp(author, 'i'); //case insensitie authorsearch
            }
        }
    

        if(category) {
            searchQuery.category = new RegExp(category, 'i'); //case insensitie category search
        }

        if(tags) {
            const tagsArray = tags.split(',').map(tag => tag.trm());
            searchQuery.tags = { $in: tagsArray };
        }

        if(startDate && endDate) {
            searchQuery.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }


        //execute the searchQuery

        let posts = await Post.find(searchQuery);

        //Apply sorting if provided
        if (sortBy) {
            const sortOptions = {};
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
            posts = posts.sort(sortOptions);
        }

        res.status(200).json(posts);
    }),
};



module.exports = searchController;