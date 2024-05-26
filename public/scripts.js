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
          console.log('Login successful! Role:', data.role); // Logging the role
          alert('Login successful!');
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role); // Store role in localStorage
          if (data.role === 'freelancer') {
            window.location.href = 'dashboard-freelancer.html';
          } else if (data.role === 'entrepreneur') {
            window.location.href = 'dashboard-entrepreneur.html';
          } else {
            console.error('Unknown role:', data.role); // Log unknown roles
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
          alert(`Signup failed: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error during signup:', error);
        alert('Signup failed.');
      }
    });
  }
});


async function fetchJobs() {
  try {
    const response = await fetch('http://localhost:3001/api/jobs');
    const jobs = await response.json();
    const jobListings = document.getElementById('job-listings');
    jobListings.innerHTML = '';
    jobs.forEach(job => {
      const jobCard = `
        <div class="w3-third w3-margin-bottom">
          <div class="w3-card-4">
            <div class="w3-container w3-white">
              <h3>${job.title}</h3>
              <p class="w3-opacity">${job.company}</p>
              <p>${job.description}</p>
              <p><b>Location:</b> ${job.location}</p>
              <p><b>Salary:</b> $${job.salary}</p>
              <button class="w3-button w3-block w3-black">Apply</button>
            </div>
          </div>
        </div>
      `;
      jobListings.innerHTML += jobCard;
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
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
      // Implementați funcționalitățile necesare pentru antreprenori aici
    } catch (error) {
      console.error('Error fetching entrepreneur data:', error);
    }
  }

  fetchEntrepreneurData();
});
