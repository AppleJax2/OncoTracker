import axios from 'axios';

// Get base URL from environment variables with a fallback
const API_URL = import.meta.env.VITE_API_URL || 'https://oncotracker.onrender.com';
const baseURL = API_URL;

console.log('=== API CONFIGURATION ===');
console.log('API_URL from env:', API_URL);
console.log('Using API baseURL:', baseURL);

// Create an axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true, // Keep this for backward compatibility
  // Set a timeout to avoid hanging requests
  timeout: 15000,
});

// Function to get the token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = getAuthToken();
    
    // If token exists, add to headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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
    // Add detailed logging for development
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });

    // Handle network errors (no response received)
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your connection and CORS configuration.'
      });
    }

    // Handle authentication errors
    if (error.response.status === 401) {
      // Clear token from localStorage
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    // Return a standardized error object
    return Promise.reject({
      status: error.response.status,
      message: error.response.data?.message || error.response.data?.error || 'An error occurred',
      details: error.response.data
    });
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