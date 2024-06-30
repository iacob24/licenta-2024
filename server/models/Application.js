const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
<<<<<<< HEAD
=======
  jobTitle: {
    type: String,
    required: true
  },
  jobCompany: {
    type: String,
    required: true
  },
>>>>>>> 3541395 (Updated filtering)
  applicantName: {
    type: String,
    required: true
  },
  applicantEmail: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    required: true
  },
  dateApplied: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);
