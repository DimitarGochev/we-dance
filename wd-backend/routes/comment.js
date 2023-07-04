const express = require('express');
const Comment = require('../models/comment');

const router = express.Router();

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: 'descending' });
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Create a new comment
router.post('/', async (req, res) => {
    try {
        const comment = new Comment({
            text: req.body.text,
            postedBy: req.body.postedBy,
            postId: req.body.postId
        });
        await comment.save();
        res.status(201).json(comment);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

router.route('/:id')
    .get(async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id);
            res.status(200).json(comment);
        } catch (error) {
            res.status(400).send(error.message);
        }
    })
    .put(async (req, res) => {
        try {
            let comment = await Comment.findById(req.params.id);
            comment.text = req.body.text;
            comment.postedBy = req.body.postedBy;
            await comment.save();
            res.status(201).json(comment);
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    })
    .delete(async (req, res) => {
        try {
            const comment = await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json(comment);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

module.exports = router;