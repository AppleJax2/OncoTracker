import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import api from '../services/api'; // Adjusted import
import { User } from '../types'; // Assuming a User type exists
import { removeAuthToken, setAuthToken } from '../services/auth'; // Update import to include setAuthToken

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<User | null>;
  logout: () => Promise<void>;
  signup: (userData: any) => Promise<void>; // Define more specific type later
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start loading on initial check
  const location = useLocation(); // Get current location

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/api/auth/me');
        console.log('Auth check response:', response.data);
        
        // Extract user from response - handle different possible structures
        let userData = null;
        
        if (response.data?.data?.user) {
          userData = response.data.data.user;
        } else if (response.data?.user) {
          userData = response.data.user;
        } else if (response.data?.data) {
          userData = response.data.data;
        } else {
          userData = response.data;
        }
        
        // If we have user data, set authentication state
        if (userData) {
          console.log('User data extracted from auth check:', userData);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          console.log('No user data found in auth check response');
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error: any) {
        console.error('Auth check error:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Prevent auth check on public routes to avoid redirect loop
    // Also, run check only once on initial load or when pathname changes
    const publicPaths = ['/', '/login', '/signup']; // Correct path to /signup
    if (!publicPaths.includes(location.pathname)) {
        checkAuthStatus();
    } else {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
    }

  }, [location.pathname]);

  const login = async (credentials: { email: string; password: string }): Promise<User | null> => {
    setIsLoading(true);
    try {
      // Accept any response structure and then determine format
      console.log('Login attempt with:', { email: credentials.email });
      const response = await api.post('/api/auth/login', credentials);
      console.log('Login response:', response.data); // Add debug logging

      let userData = null;
      let token = null;

      // Enhanced handling of different possible response structures
      if (response.data?.data?.user) {
        // Format: { data: { user: {...} }, token: "..." }
        userData = response.data.data.user;
        token = response.data.token;
      } else if (response.data?.user) {
        // Format: { user: {...}, token: "..." }
        userData = response.data.user;
        token = response.data.token;
      } else if (response.data?.data) {
        // Format: { data: {...}, token: "..." }
        userData = response.data.data;
        token = response.data.token;
      } else if (response.data?.status === 'success') {
        // Format: { status: 'success', token: "...", data: {...} }
        userData = response.data.data;
        token = response.data.token;
      } else {
        // Try to extract data directly from response
        userData = response.data;
        token = response.data.token;
      }

      console.log('Extracted user data:', userData);
      console.log('Extracted token:', token);

      // Ensure userData has proper format and required fields
      if (userData) {
        // Handle id field (_id vs id)
        if (userData._id && !userData.id) {
          userData.id = userData._id;
        }
        
        // Ensure role is set (default to 'owner' if not present)
        if (!userData.role) {
          console.log('User role not found, defaulting to owner');
          userData.role = 'owner';
        }
      }

      if (userData && token) {
        // Store the token in localStorage
        setAuthToken(token);
        
        setUser(userData);
        setIsAuthenticated(true);
        console.log('User authenticated successfully:', userData);
        return userData;
      } else {
        console.error('Login response missing user data or token:', response.data);
        throw new Error(response.data?.message || 'Login succeeded but could not extract user data or token from response.');
      }
    } catch (error: any) {
      console.error('Login error:', error); // Add debug logging
      
      // Extract detailed error message
      let errorMessage = 'Login failed. Please check your credentials and try again.';
      
      if (error.response) {
        console.error('Error response details:', error.response);
        // Server responded with error
        errorMessage = error.response.data?.message || 
                      error.response.data?.error || 
                      `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request made but no response received
        errorMessage = 'No response from server. Please check your connection.';
      } else if (error.message) {
        // Something else went wrong
        errorMessage = error.message;
      }
      
      setUser(null);
      setIsAuthenticated(false);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any) => {
    setIsLoading(true);
    try {
      console.log('Signup data:', userData); // Log the userData being sent
      const response = await api.post('/api/auth/signup', userData);
      console.log('Signup response:', response.data); // Log successful response
      
      if (response.data && (response.data.status === 'success' || response.data.token)) {
        // Store the token in localStorage if it exists in the response
        if (response.data.token) {
          setAuthToken(response.data.token);
        }
        
        // Handle different response formats
        if (response.data.data?.user) {
          setUser(response.data.data.user);
        } else if (response.data.user) {
          setUser(response.data.user);  
        }
        
        setIsAuthenticated(true);
      } else {
        throw new Error(response.data?.message || 'Signup succeeded but response format was unexpected');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Extract detailed error message
      let errorMessage = 'Signup failed. Please try again.';
      
      if (error.response) {
        console.error('Error response:', error.response);
        // Server responded with error
        errorMessage = error.response.data?.message || 
                      error.response.data?.error || 
                      `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request made but no response received
        errorMessage = 'No response from server. Please check your connection.';
      } else if (error.message) {
        // Something else went wrong
        errorMessage = error.message;
      }
      
      setUser(null);
      setIsAuthenticated(false);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.get('/api/auth/logout');
    } catch (error) {
      // Still proceed with local logout even if API fails
    } finally {
      // Clear token from localStorage
      removeAuthToken();
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext }; // Export the context itself if needed elsewhere, though useAuth is preferred

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 