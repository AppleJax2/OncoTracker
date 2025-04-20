import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import api from '../services/api'; // Adjusted import
import { User } from '../types'; // Assuming a User type exists

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
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

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        // Attempt to fetch current user data (relies on cookie being sent)
        const response = await api.get('/auth/me');
        if (response.data && response.data.status === 'success') {
          setUser(response.data.data.user);
          setIsAuthenticated(true);
        } else {
          // Clear local state if /me fails (e.g., invalid/expired cookie)
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        // Expected error if not logged in (e.g., 401 from protect middleware)
        console.log('Auth check failed (likely not logged in):', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data && response.data.status === 'success') {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
      } else {
        // Handle potential API error structure
        throw new Error(response.data?.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setUser(null);
      setIsAuthenticated(false);
      // Re-throw or handle error display
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/signup', userData);
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
      await api.get('/auth/logout'); // Call backend logout to clear cookie
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