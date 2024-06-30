const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

router.put('/edit', async (req, res) => {
    const { userId, name, email, bio } = req.body;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            user.bio = bio || user.bio;
            await user.save();
            res.status(200).json({ message: 'Profile updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/upload-logo', async (req, res) => {
    const { userId, logo } = req.body;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.logo = logo;
            await user.save();
            res.status(200).json({ message: 'Logo uploaded successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/update-contact', async (req, res) => {
    const { userId, contactInfo } = req.body;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.contactInfo = contactInfo;
            await user.save();
            res.status(200).json({ message: 'Contact info updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
