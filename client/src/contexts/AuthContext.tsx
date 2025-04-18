import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import * as authService from '../services/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, practice?: any) => Promise<void>;
  logout: () => void;
}

// Create the auth context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null
  });

  // Load user on first render if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (!authState.token) {
        setAuthState(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        const user = await authService.getCurrentUser();
        setAuthState({
          token: authState.token,
          isAuthenticated: true,
          loading: false,
          user,
          error: null
        });
      } catch (error) {
        localStorage.removeItem('token');
        setAuthState({
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: 'Authentication failed. Please login again.'
        });
      }
    };

    loadUser();
  }, [authState.token]);

  // Login user
  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await authService.login({ email, password });
      
      localStorage.setItem('token', response.token);
      
      setAuthState({
        token: response.token,
        isAuthenticated: true,
        loading: false,
        user: response.user,
        error: null
      });
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.msg || 'Login failed. Please try again.'
      }));
      throw error;
    }
  };

  // Register user
  const register = async (name: string, email: string, password: string, practice?: any) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await authService.register({ name, email, password, practice });
      
      localStorage.setItem('token', response.token);
      
      setAuthState({
        token: response.token,
        isAuthenticated: true,
        loading: false,
        user: response.user,
        error: null
      });
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.msg || 'Registration failed. Please try again.'
      }));
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
      error: null
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 