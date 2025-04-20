import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import api from '../services/api'; // Adjusted import
import { User } from '../types'; // Assuming a User type exists

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
        console.log('AuthContext: Checking authentication status...');
        const response = await api.get('/api/auth/me');
        if (response.data && response.data.user) {
          console.log('AuthContext: User found, setting auth state:', response.data.user);
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error: any) {
        // Check if error has response and status before accessing them
        const status = error?.response?.status;
        // Don't log expected 401s triggered by the interceptor redirect
        if (status !== 401) {
           console.log('Auth check failed (likely not logged in):', error);
        }
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Prevent auth check on public routes to avoid redirect loop
    const publicPaths = ['/', '/login', '/signup']; // Correct path to /signup
    if (!publicPaths.includes(location.pathname)) {
        console.log(`AuthContext: Not on a public path (${location.pathname}), checking auth status.`);
        checkAuthStatus();
    } else {
        console.log(`AuthContext: On public path (${location.pathname}), skipping initial auth check.`);
        setUser(null); // Ensure user is null if on public path
        setIsAuthenticated(false);
        setIsLoading(false); // Ensure loading is set to false
    }

  }, [location.pathname]); // Re-run effect if path changes

  const login = async (credentials: { email: string; password: string }): Promise<User | null> => {
    setIsLoading(true);
    try {
      console.log('=== LOGIN ATTEMPT ===');
      console.log('Login credentials (email):', credentials.email);
      console.log('API URL:', api.defaults.baseURL);
      
      // Assume a 200 OK from this endpoint means success
      console.log('Sending request to:', `${api.defaults.baseURL}/api/auth/login`);
      
      try {
        const response = await api.post<{ data: { user: User }, status: string, message?: string }>('/api/auth/login', credentials);
        console.log('=== LOGIN RESPONSE ===');
        console.log('Status code:', response.status);
        console.log('Response headers:', response.headers);
        console.log('Response data:', JSON.stringify(response.data, null, 2));

        // Check if the expected user data is present in the response
        if (response.data && response.data.data && response.data.data.user) {
          const userData = response.data.data.user;
          console.log('Login successful, user data:', userData);
          setUser(userData);
          setIsAuthenticated(true);
          return userData; // Return the user data directly
        } else {
          console.error('Login response missing expected user data structure:', response.data);
          throw new Error(response.data?.message || 'Login succeeded but received invalid data structure.');
        }
      } catch (apiError: any) {
        console.error('=== LOGIN API ERROR ===');
        console.error('Error type:', typeof apiError);
        console.error('Is axios error?', apiError.isAxiosError || false);
        console.error('Status:', apiError.response?.status);
        console.error('Status text:', apiError.response?.statusText);
        console.error('Data:', apiError.response?.data);
        console.error('Message:', apiError.message);
        
        if (!apiError.response) {
          console.error('Network error - no response from server. CORS or connectivity issue likely.');
        }
        
        throw apiError;
      }
    } catch (error: any) {
      // Errors should be caught by the Axios interceptor or the catch block here
      console.error('Login failed in AuthContext (outer catch):', error);
      setUser(null);
      setIsAuthenticated(false);
      // Ensure the error is re-thrown so LoginPage can display it
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/auth/signup', userData);
      if (response.data && response.data.status === 'success') {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
      } else {
        throw new Error(response.data?.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.get('/api/auth/logout');
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Still proceed with local logout even if API fails
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      // Optionally redirect here or let the component handle it
      // window.location.href = '/login';
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