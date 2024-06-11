const express = require('express');
const router = express.Router();
const Application = require('../models/Application'); // Ensure this path is correct

// Create a new application
router.post('/', async (req, res) => {
    const { jobId, applicantName, applicantEmail, coverLetter } = req.body;
    const application = new Application({ jobId, applicantName, applicantEmail, coverLetter });

    try {
        const newApplication = await application.save();
        res.status(201).json(newApplication);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all applications
router.get('/', async (req, res) => {
    try {
        const applications = await Application.find();
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
