document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Dummy login check
    const role = document.getElementById('role').value;
    if (role === 'admin') {
      window.location.href = 'admin-dashboard.html';
    } else {
      window.location.href = 'user-dashboard.html';
    }
  });
  
  document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('User registered successfully!');
    window.location.href = 'index.html';
  });
  
  function logout() {
    alert('Logged out!');
    window.location.href = 'index.html';
  }
  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;
  
    if (!username || !password || !role) {
      alert("Please fill all fields and select a role.");
      return;
    }
  
    // This is a placeholder for real authentication logic
    if (role === "admin") {
      alert("Logged in as Admin");
      window.location.href = "admin-dashboard.html";
    } else if (role === "user") {
      alert("Logged in as User");
      window.location.href = "user-dashboard.html";
    } else {
      alert("Invalid role selected.");
    }
  });
  
const API_URL = 'http://localhost:5000/api';

let token = localStorage.getItem('token') || '';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

async function login(username, password, role) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, role })
  });
  const data = await res.json();

  if (res.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userRole', data.user.role);
    window.location.href = data.user.role === 'admin' ? 'admin.html' : 'dashboard.html';
  } else {
    alert(data.msg);
  }
}

async function register(user) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  const data = await res.json();
  if (res.ok) {
    alert('Registration successful!');
    window.location.href = 'index.html';
  } else {
    alert(data.msg);
  }
}

async function getProfile() {
  const res = await fetch(`${API_URL}/user/profile`, { headers });
  return await res.json();
}

async function bookCylinder(paymentMethod) {
  const res = await fetch(`${API_URL}/user/book`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ paymentMethod })
  });
  const data = await res.json();
  alert(data.msg);
}

async function getBookings() {
  const res = await fetch(`${API_URL}/user/my-bookings`, { headers });
  return await res.json();
}


fetch('http://localhost:5000/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    // booking details
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));

const express = require('express');
const router = express.Router();
const authenticateToken = require('./middleware/auth');

router.post('/bookings', authenticateToken, (req, res) => {
  // Booking logic here
});
