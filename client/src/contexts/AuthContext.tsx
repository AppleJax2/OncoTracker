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
        const response = await api.get('/api/auth/me');
        if (response.data && response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error: any) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Prevent auth check on public routes to avoid redirect loop
    const publicPaths = ['/', '/login', '/signup']; // Correct path to /signup
    if (!publicPaths.includes(location.pathname)) {
        checkAuthStatus();
    } else {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
    }

  }, [location.pathname]); // Re-run effect if path changes

  const login = async (credentials: { email: string; password: string }): Promise<User | null> => {
    setIsLoading(true);
    try {
      const response = await api.post<{ data: { user: User }, status: string, message?: string }>('/api/auth/login', credentials);

      // Check if the expected user data is present in the response
      if (response.data && response.data.data && response.data.data.user) {
        const userData = response.data.data.user;
        setUser(userData);
        setIsAuthenticated(true);
        return userData;
      } else {
        throw new Error(response.data?.message || 'Login succeeded but received invalid data structure.');
      }
    } catch (error: any) {
      setUser(null);
      setIsAuthenticated(false);
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
      // Still proceed with local logout even if API fails
    } finally {
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