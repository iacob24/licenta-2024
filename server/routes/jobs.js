const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/api/jobs', async (req, res) => {
  try {
      const { salary, location } = req.query;
      const query = {};
      if (salary) {
          query.salary = { $lte: Number(salary) };
      }
      if (location) {
          query.location = location;
      }
      const jobs = await Job.find(query);
      res.json(jobs);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

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

router.get('/applied', authenticateToken, async (req, res) => {
  try {
    const jobs = await Job.find({ appliedUsers: req.user.id });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/reviewed', authenticateToken, async (req, res) => {
  try {
    const jobs = await Job.find({ reviewedBy: req.user.id });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/past', authenticateToken, async (req, res) => {
  try {
    const jobs = await Job.find({ entrepreneur: req.user.id });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
