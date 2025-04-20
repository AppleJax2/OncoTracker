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
    console.log(`=== API REQUEST [${config.method?.toUpperCase()}] ${config.url} ===`);
    
    if (config.data) {
      const safeData = {...config.data};
      // Don't log passwords
      if (safeData.password) safeData.password = '********';
      console.log('Request data:', safeData);
    }
    
    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('=== REQUEST ERROR ===');
    console.error('Error making request:', error.message);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log(`=== API RESPONSE [${response.status}] ${response.config.url} ===`);
    console.log('Response data:', response.data);
    return response;
  },
  (error) => {
    console.error('=== API ERROR ===');
    
    // Handle network errors (no response received)
    if (!error.response) {
      console.error('Network Error - No response received:', error.message);
      console.error('Request was to:', error.config?.url);
      console.error('Browser online status:', navigator.onLine);
      
      // Try to ping the API using fetch to check CORS
      console.log('Attempting basic fetch to API root to check connectivity...');
      fetch(baseURL + '/api')
        .then(res => console.log('Fetch test succeeded:', res.status))
        .catch(err => console.error('Fetch test failed:', err));
      
      return Promise.reject({
        message: 'Network error. Please check your connection and CORS configuration.'
      });
    }

    // Log detailed error information for debugging
    console.error('API Error Details:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      headers: error.response?.headers,
      data: error.response?.data
    });

    // Handle authentication errors
    if (error.response.status === 401) {
      console.warn('Authentication error (401) - redirecting to login');
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
    console.log('API connection test successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API connection test failed:', error);
    return { success: false, error };
  }
};

export default api; 