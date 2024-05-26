const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const dbURI = 'mongodb://localhost:27017/job-portal'; // Ensure this string is correct

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
const blog = require('./routes/blog'); // Add this line

app.use('/api/auth', users);
app.use('/api/jobs', jobs);
app.use('/api/blog', blog); // Add this line

app.listen(port, () => console.log(`Server running on port ${port}`));
