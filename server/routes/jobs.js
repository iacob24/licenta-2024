const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authenticateToken = require('../middleware/authenticateToken');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new job (protected route)
router.post('/', authenticateToken, async (req, res) => {
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    company: req.body.company,
    location: req.body.location,
    salary: req.body.salary
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

// Get jobs applied by the user
router.get('/applied', authenticateToken, async (req, res) => {
  try {
      const jobs = await Job.find({ appliedUsers: req.user.id });
      res.json(jobs);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Get reviewed jobs by the user
router.get('/reviewed', authenticateToken, async (req, res) => {
  try {
      const jobs = await Job.find({ reviewedBy: req.user.id });
      res.json(jobs);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Get past jobs by the entrepreneur
router.get('/past', authenticateToken, async (req, res) => {
  try {
      const jobs = await Job.find({ entrepreneur: req.user.id });
      res.json(jobs);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

