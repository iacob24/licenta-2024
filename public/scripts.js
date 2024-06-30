document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Login successful! Role:', data.role); 
          alert('Login successful!');
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role); 
          if (data.role === 'freelancer') {
            window.location.href = 'dashboard-freelancer.html';
          } else if (data.role === 'entrepreneur') {
            window.location.href = 'dashboard-entrepreneur.html';
          } else {
            console.error('Unknown role:', data.role); 
          }
        } else {
          alert('Login failed.');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    });
  }

 if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const role = document.getElementById('role').value;

      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      console.log('Form Data:', { name, username, email, password, role }); 

      try {
        const response = await fetch('http://localhost:3001/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, username, email, password, role })
        });

        if (response.ok) {
          alert('Signup successful!');
          window.location.href = 'login.html';
        } else {
          const errorData = await response.json();
          console.error('Signup failed:', errorData); 
          alert(`Signup failed: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error during signup:', error); 
        alert('Signup failed.');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', async () => {
<<<<<<< HEAD
=======
  const filterForm = document.getElementById('filterForm');

  filterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loadJobs();
  });

  loadJobs(); // Initial load without filters
});

async function loadJobs() {
  try {
      const salary = document.getElementById('filterSalary').value;
      const location = document.getElementById('filterLocation').value;

      let url = 'http://localhost:3001/api/jobs';
      const params = new URLSearchParams();
      if (salary) {
          params.append('salary', salary);
      }
      if (location) {
          params.append('location', location);
      }
      if (params.toString()) {
          url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const jobs = await response.json();

      const jobListings = document.getElementById('job-listings');
      jobListings.innerHTML = '';

      jobs.forEach(job => {
          const jobElement = document.createElement('div');
          jobElement.className = 'w3-quarter w3-margin-bottom';
          jobElement.innerHTML = `
              <div class="w3-card-4 w3-white">
                  <div class="w3-container">
                      <h3>${job.title}</h3>
                      <p>${job.company}</p>
                      <p>$${job.salary !== undefined ? job.salary : 'N/A'}</p>
                      <p>${job.location}</p>
                      <button class="w3-button w3-blue w3-margin-bottom">Apply</button>
                  </div>
              </div>
          `;
          jobListings.appendChild(jobElement);
      });
  } catch (error) {
      console.error('Error fetching jobs:', error);
  }
}




document.addEventListener('DOMContentLoaded', async () => {
>>>>>>> 3541395 (Updated filtering)
  async function fetchJobs() {
      try {
          const response = await fetch('http://localhost:3001/api/jobs');
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const jobs = await response.json();
          const jobListings = document.getElementById('job-listings');
          jobListings.innerHTML = '';
          
          jobs.forEach((job, index) => {
              if (index % 3 === 0) {
                  jobListings.innerHTML += `<div class="w3-row-padding">`;
              }
              jobListings.innerHTML += `
                  <div class="w3-third w3-margin-bottom">
                      <div class="w3-card-4">
                          <div class="w3-container w3-white">
                              <h3>${job.title}</h3>
                              <p class="w3-opacity">${job.company}</p>
                              <p>${job.description}</p>
                              <p><b>Location:</b> ${job.location}</p>
                              <p><b>Salary:</b> $${job.salary}</p>
                              <button class="w3-button w3-block w3-black" onclick="applyJob('${job._id}', '${job.title}', '${job.company}')">Apply</button>
                          </div>
                      </div>
                  </div>
              `;
              if (index % 3 === 2 || index === jobs.length - 1) {
                  jobListings.innerHTML += `</div>`;
              }
          });
      } catch (error) {
          console.error('Error fetching jobs:', error);
      }
  }

  fetchJobs();
});

function applyJob(jobId, jobTitle, jobCompany) {
  localStorage.setItem('applyJobId', jobId);
  localStorage.setItem('applyJobTitle', jobTitle);
  localStorage.setItem('applyJobCompany', jobCompany);
  window.location.href = 'apply.html';
}



document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const messagesDiv = document.getElementById('message-list');
  const messageForm = document.getElementById('messageForm');

  async function fetchMessages() {
      try {
          const response = await fetch('http://localhost:3001/api/messages', {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          });
          const messages = await response.json();
          messagesDiv.innerHTML = '';
          messages.forEach(message => {
              const messageElement = document.createElement('div');
              messageElement.textContent = `${message.sender}: ${message.text}`;
              messagesDiv.appendChild(messageElement);
          });
      } catch (error) {
          console.error('Error fetching messages:', error);
      }
  }

  if (messageForm) {
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const messageText = document.getElementById('messageText').value;

        try {
            const response = await fetch('http://localhost:3001/api/messages', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: messageText })
            });

            if (response.ok) {
                fetchMessages();
                messageForm.reset();
            } else {
                alert('Failed to send message.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    fetchMessages();
  }
});

async function fetchAppliedJobs() {
  const token = localStorage.getItem('token');
  try {
      const response = await fetch('http://localhost:3001/api/jobs/applied', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });
      const jobs = await response.json();
      const jobsAppliedUl = document.getElementById('jobsApplied');
      jobsAppliedUl.innerHTML = '';
      jobs.forEach(job => {
          const jobElement = document.createElement('li');
          jobElement.textContent = `${job.title} at ${job.company}`;
          jobsAppliedUl.appendChild(jobElement);
      });
  } catch (error) {
      console.error('Error fetching applied jobs:', error);
  }
}

async function fetchReviewedJobs() {
  const token = localStorage.getItem('token');
  try {
      const response = await fetch('http://localhost:3001/api/jobs/reviewed', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });
      const jobs = await response.json();
      const jobsReviewedUl = document.getElementById('jobsReviewed');
      jobsReviewedUl.innerHTML = '';
      jobs.forEach(job => {
          const jobElement = document.createElement('li');
          jobElement.textContent = `${job.title} - Status: ${job.status}`;
          jobsReviewedUl.appendChild(jobElement);
      });
  } catch (error) {
      console.error('Error fetching reviewed jobs:', error);
  }
}

async function fetchPastJobs() {
  const token = localStorage.getItem('token');
  try {
      const response = await fetch('http://localhost:3001/api/jobs/past', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });
      const jobs = await response.json();
      const pastClientsUl = document.getElementById('pastClients');
      pastClientsUl.innerHTML = '';
      jobs.forEach(job => {
          const jobElement = document.createElement('li');
          jobElement.textContent = `${job.title} at ${job.company}`;
          pastClientsUl.appendChild(jobElement);
      });
  } catch (error) {
      console.error('Error fetching past jobs:', error);
  }
}

const uploadCVForm = document.getElementById('uploadCVForm');
const uploadPortfolioForm = document.getElementById('uploadPortfolioForm');

if (uploadCVForm) {
  uploadCVForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(uploadCVForm);
      try {
          const response = await fetch('http://localhost:3001/api/upload/cv', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`
              },
              body: formData
          });
          if (response.ok) {
              alert('CV uploaded successfully!');
          } else {
              alert('Failed to upload CV.');
          }
      } catch (error) {
          console.error('Error uploading CV:', error);
      }
  });
}

if (uploadPortfolioForm) {
  uploadPortfolioForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(uploadPortfolioForm);
      try {
          const response = await fetch('http://localhost:3001/api/upload/portfolio', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`
              },
              body: formData
          });
          if (response.ok) {
              alert('Portfolio uploaded successfully!');
          } else {
              alert('Failed to upload portfolio.');
          }
      } catch (error) {
          console.error('Error uploading portfolio:', error);
      }
  });
}

async function fetchBlogPosts() {
  const token = localStorage.getItem('token');
  try {
      const response = await fetch('http://localhost:3001/api/blog', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });
      const posts = await response.json();
      const blogPostsDiv = document.getElementById('blogPosts');
      blogPostsDiv.innerHTML = '';
      posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
          blogPostsDiv.appendChild(postElement);
      });
  } catch (error) {
      console.error('Error fetching blog posts:', error);
  }
}

/*async function fetchBlogPosts() {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:3001/api/blog', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();
    const blogPostsDiv = document.getElementById('blogPosts');
    blogPostsDiv.innerHTML = '';
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
      blogPostsDiv.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
}

const addBlogPostForm = document.getElementById('addBlogPostForm');
if (addBlogPostForm) {
  addBlogPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3001/api/blog', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      });

      if (response.ok) {
        fetchBlogPosts();
        addBlogPostForm.reset();
      } else {
        alert('Failed to add blog post.');
      }
    } catch (error) {
      console.error('Error adding blog post:', error);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchBlogPosts();
});*/

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

  async function fetchEntrepreneurData() {
    try {
    } catch (error) {
      console.error('Error fetching entrepreneur data:', error);
    }
  }

  fetchEntrepreneurData();
});
