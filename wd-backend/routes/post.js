const express = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: 'descending' });
        const postsWithComments = await Promise.all(posts.map(async (post) => {
            const comments = await Comment.find({ postId: post._id }).sort({ createdAt: 'descending' });
            const commentsWithUsers = await Promise.all(comments.map(async (comment) => {
               const user = await User.findById(comment.postedBy);
               return { ...comment.toClient(), postedBy: user };
            }));
            return {...post.toClient(), comments: commentsWithUsers};
        }));
        const postsWithCommentsAndUsers = await Promise.all(postsWithComments.map(async (post) => {
            const user = await User.findById(post.postedBy);
            return { ...post, postedBy: user };
        }));
        res.status(200).json(postsWithCommentsAndUsers);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Create a new post
router.post('/', async (req, res) => {
    try {
        const post = new Post({
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            postedBy: req.body.postedBy
        });
        await post.save();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

router.route('/:id')
    .get(async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(400).send(error.message);
        }
    })
    .put(async (req, res) => {
        try {
            let post = await Post.findById(req.params.id);
            post.description = req.body.description;
            post.imageUrl = req.body.imageUrl;
            post.postedBy = req.body.postedBy;
            await post.save();
            res.status(201).json(post);
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    })
    .delete(async (req, res) => {
        try {
            const post = await Post.findByIdAndDelete(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

module.exports = router;