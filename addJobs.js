const mongoose = require('mongoose');
const Job = require('./server/models/Job');

const dbURI = 'mongodb://localhost:27017/job-portal';

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const jobs = [
  {
    title: 'Front-End Developer',
    description: 'Developing and maintaining the front end of a website.',
    company: 'Tech Solutions',
    location: 'Remote',
    salary: 60000
  },
  {
    title: 'Back-End Developer',
    description: 'Developing and maintaining the back end of a website.',
    company: 'Innovative Systems',
    location: 'New York, NY',
    salary: 70000
  },
  {
    title: 'Full-Stack Developer',
    description: 'Developing and maintaining both front end and back end of a website.',
    company: 'Web Dev Corp',
    location: 'San Francisco, CA',
    salary: 80000
  },
  {
    title: 'Graphic Designer',
    description: 'Creating visual concepts to communicate ideas that inspire, inform, or captivate consumers.',
    company: 'Design Studio',
    location: 'Los Angeles, CA',
    salary: 50000
  },
  {
    title: 'SEO Specialist',
    description: 'Optimizing website content and structure to improve search engine rankings.',
    company: 'Marketing Agency',
    location: 'Remote',
    salary: 55000
  },
  {
    title: 'Data Analyst',
    description: 'Interpreting data and analyzing results using statistical techniques.',
    company: 'Finance Corp',
    location: 'Chicago, IL',
    salary: 65000
  },
  {
    title: 'Project Manager',
    description: 'Overseeing projects from start to finish, ensuring they are completed on time and within budget.',
    company: 'Construction Ltd.',
    location: 'Dallas, TX',
    salary: 75000
  },
  {
    title: 'Marketing Coordinator',
    description: 'Supporting marketing campaigns and strategies.',
    company: 'Retail Company',
    location: 'Boston, MA',
    salary: 48000
  },
  {
    title: 'HR Manager',
    description: 'Managing the recruitment, selection, and onboarding process.',
    company: 'Corporate Solutions',
    location: 'Seattle, WA',
    salary: 70000
  },
  {
    title: 'Sales Representative',
    description: 'Selling products and services to potential clients.',
    company: 'Tech Store',
    location: 'Miami, FL',
    salary: 45000
  },
  {
    title: 'Customer Support Specialist',
    description: 'Assisting customers with inquiries and resolving issues.',
    company: 'Support Center',
    location: 'Remote',
    salary: 40000
  },
  {
    title: 'Content Writer',
    description: 'Creating engaging content for websites, blogs, and social media.',
    company: 'Media Group',
    location: 'New York, NY',
    salary: 52000
  }
];

Job.insertMany(jobs)
  .then(() => {
    console.log('Jobs added successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log('Error adding jobs:', err);
    mongoose.connection.close();
  });
