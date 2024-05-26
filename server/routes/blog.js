const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const BlogPost = require('../models/BlogPost'); // Presupunem că ai un model pentru postările pe blog

// Obține toate postările pe blog
router.get('/', authenticateToken, async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Adaugă o postare pe blog
router.post('/', authenticateToken, async (req, res) => {
    const { title, content } = req.body;
    const newPost = new BlogPost({
        title,
        content,
        author: req.user.id
    });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
