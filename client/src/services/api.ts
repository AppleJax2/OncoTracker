import axios from 'axios';

// Get base URL from environment variables with a fallback
const API_URL = import.meta.env.VITE_API_URL || '';
const baseURL = API_URL ? API_URL : '/api';

// Create an axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network Error', error);
      return Promise.reject({
        message: 'Network error. Please check your connection.'
      });
    }

    // Handle authentication errors
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error.response.data);
  }
);

export default api; 