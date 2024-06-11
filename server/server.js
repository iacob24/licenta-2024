const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const dbURI = 'mongodb://localhost:27017/job-portal';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
const users = require('./routes/users');
const jobs = require('./routes/jobs');
const applications = require('./routes/applications');
const projects = require('./routes/projects');
const upload = require('./routes/upload');

app.use('/api/auth', users);
app.use('/api/jobs', jobs);
app.use('/api/applications', applications);
app.use('/api/projects', projects);
app.use('/api/upload', upload);

app.listen(port, () => console.log(`Server running on port ${port}`));
