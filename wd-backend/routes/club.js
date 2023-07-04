const express = require('express');
const Club = require('../models/club');

const router = express.Router();

// Get all clubs
router.get('/', async (req, res) => {
    try {
        const clubs = await Club.find().sort({ name: '1' });
        res.status(200).json(clubs);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Create a new club
router.post('/', async (req, res) => {
    try {
        const club = new Club({
            name: req.body.name,
            logo: req.body.logo,
            owner: req.body.owner,
            members: req.body.members
        });
        await club.save();
        res.status(201).json(club);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

router.route('/:id')
    .get(async (req, res) => {
        try {
            const club = await Club.findById(req.params.id);
            res.status(200).json(club);
        } catch (error) {
            res.status(400).send(error.message);
        }
    })
    .put(async (req, res) => {
        try {
            let club = await Club.findById(req.params.id);
            club.name = req.body.name;
            club.logo = req.body.logo;
            club.owner = req.body.owner;
            club.members = req.body.members;
            await club.save();
            res.status(201).json(club);
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    })
    .delete(async (req, res) => {
        try {
            const club = await Club.findByIdAndDelete(req.params.id);
            res.status(200).json(club);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

module.exports = router;