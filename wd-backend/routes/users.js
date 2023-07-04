const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: 'descending' }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
            role: req.body.role,
            status: req.body.status
        });
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

router.route('/:id')
    .get(async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).send(error.message);
        }
    })
    .put(async (req, res) => {
        try {
            let user = await User.findById(req.params.id);
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.password = req.body.password;
            user.avatar = req.body.avatar;
            user.role = req.body.role;
            user.status = req.body.status;
            await user.save();
            res.status(201).json(user);
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    })
    .delete(async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

module.exports = router;