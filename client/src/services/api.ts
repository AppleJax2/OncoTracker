import axios from 'axios';

// Get base URL from environment variables with a fallback
const API_URL = import.meta.env.VITE_API_URL || 'https://oncotracker.onrender.com';
const baseURL = API_URL;

// Create an axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Enable sending cookies with requests
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // No need to manually add token - cookies are sent automatically
    console.log('API Request to:', config.url);
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

    // Log error details for debugging
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });

    // Handle authentication errors
    if (error.response.status === 401) {
      // No need to remove localStorage token - using cookies
      window.location.href = '/login';
    }

    return Promise.reject(error.response.data);
  }
);

export default api; 