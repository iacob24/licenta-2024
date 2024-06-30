const mongoose = require('mongoose');
const Application = require('./server/models/Application');

const dbURI = 'mongodb://localhost:27017/job-portal';

mongoose.connect(dbURI, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

async function createApplication(jobId, jobTitle, jobCompany, applicantName, applicantEmail, coverLetter) {
  const applicationExists = await Application.findOne({ jobId, applicantEmail });
  if (applicationExists) {
    console.log(`Application for job ID ${jobId} by ${applicantEmail} already exists.`);
    return;
  }

  const application = new Application({
    jobId,
    jobTitle,
    jobCompany,
    applicantName,
    applicantEmail,
    coverLetter,
    dateApplied: new Date()
  });

  await application.save();
  console.log(`Application for job ID ${jobId} by ${applicantName} created successfully`);
}

async function main() {
  const jobId = localStorage.getItem('applyJobId');
  const jobTitle = localStorage.getItem('applyJobTitle');
  const jobCompany = localStorage.getItem('applyJobCompany');
  const applicantName = 'John Doe';
  const applicantEmail = 'john.doe@example.com';
  const coverLetter = 'This is a sample cover letter.';

  await createApplication(jobId, jobTitle, jobCompany, applicantName, applicantEmail, coverLetter);

  mongoose.connection.close();
}

main().catch(err => console.log(err));
