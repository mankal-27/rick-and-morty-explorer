// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this to your backend API URL
});

// Request interceptor to attach token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ensure token is stored in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
