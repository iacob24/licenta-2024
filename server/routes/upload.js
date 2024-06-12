const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/x-rar-compressed'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.post('/cv', upload.single('cv'), (req, res) => {
    if (req.file) {
        res.status(200).json({ message: 'CV uploaded successfully!', file: req.file });
    } else {
        res.status(400).json({ message: 'Failed to upload CV.' });
    }
});

router.post('/portfolio', upload.single('portfolio'), (req, res) => {
    if (req.file) {
        res.status(200).json({ message: 'Portfolio uploaded successfully!', file: req.file });
    } else {
        res.status(400).json({ message: 'Failed to upload portfolio.' });
    }
});

module.exports = router;
