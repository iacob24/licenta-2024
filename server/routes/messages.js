const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const Message = require('../models/Message'); // Presupunem că ai un model pentru mesaje

// Obține toate mesajele
router.get('/', authenticateToken, async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Trimite un mesaj nou
router.post('/', authenticateToken, async (req, res) => {
    const { text } = req.body;
    const newMessage = new Message({
        sender: req.user.id,
        text
    });

    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
