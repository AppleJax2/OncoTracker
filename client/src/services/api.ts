import axios from 'axios';

// Get base URL from environment variables with a fallback
const API_URL = import.meta.env.VITE_API_URL || 'https://oncotracker.onrender.com';
const baseURL = API_URL;

console.log('=== API CONFIGURATION ===');
console.log('API_URL from env:', import.meta.env.VITE_API_URL || 'Not set');
console.log('Using API baseURL:', baseURL);

// Create an axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true, // Enable sending cookies with requests
  // Set a timeout to avoid hanging requests
  timeout: 15000,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
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
    // Handle network errors (no response received)
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your connection and CORS configuration.'
      });
    }

    // Handle authentication errors
    if (error.response.status === 401) {
      // No need to remove localStorage token - using cookies
      window.location.href = '/login';
    }

    return Promise.reject(error.response.data);
  }
);

// Export a test function to verify API connection
export const testApiConnection = async () => {
  try {
    const response = await api.get('/api');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
};

export default api; 