const express = require('express');
const multer = require('multer');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Upload CV
router.post('/cv', authenticateToken, upload.single('cv'), (req, res) => {
    res.status(201).json({ message: 'CV uploaded successfully', file: req.file });
});

// Upload Portfolio
router.post('/portfolio', authenticateToken, upload.single('portfolio'), (req, res) => {
    res.status(201).json({ message: 'Portfolio uploaded successfully', file: req.file });
});

module.exports = router;
