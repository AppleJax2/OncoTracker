import axios from 'axios';

// Determine the base URL based on the environment
const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://oncotracker-backend-url.com/api' // Replace with your actual production backend URL
  : 'http://localhost:5000/api'; // Your local development backend URL

const apiService = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Important: ensures cookies (like the JWT) are sent with requests
});

// Optional: Add request interceptor to handle errors or add headers
apiService.interceptors.request.use(
  (config) => {
    // You could add authorization headers here if needed, but we use cookies
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor to handle global errors
apiService.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Handle common errors like 401 Unauthorized, 403 Forbidden globally if desired
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      // Example: Redirect to login on 401
      if (error.response.status === 401) {
          // Check if we are already on a public page to avoid redirect loops
          if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/signup')) {
            // Trigger logout logic from AuthContext or directly redirect
            // Note: Directly manipulating window.location can be disruptive.
            // Consider using context/state to trigger navigation.
             console.warn('Unauthorized (401). Consider redirecting to login.');
            // window.location.href = '/login';
          }
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API No Response Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Request Setup Error:', error.message);
    }

    // It's important to return a rejected promise to allow calling code to handle the error too
    return Promise.reject(error);
  }
);

export default apiService; 