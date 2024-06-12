const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); 

router.post('/', async (req, res) => {
    const { title, description, skills, budget, deadline } = req.body;
    const project = new Project({ title, description, skills, budget, deadline });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
