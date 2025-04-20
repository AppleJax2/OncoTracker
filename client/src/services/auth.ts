import api from './api';
import { User } from '../types';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  practice?: {
    name: string;
    address: string;
    phone: string;
  } | undefined;
}

interface AuthResponse {
  token: string;
  user: User;
}

// Token storage functions
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

export const login = async (loginData: LoginData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/api/auth/login', loginData);
    // Store the token in localStorage
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error: any) {
    console.error('Login API error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const register = async (registerData: RegisterData): Promise<AuthResponse> => {
  try {
    console.log('Sending registration data:', JSON.stringify(registerData));
    const response = await api.post<AuthResponse>('/api/auth/register', registerData);
    // Store the token in localStorage
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error: any) {
    console.error('Registration API error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get<User>('/api/auth/me');
    return response.data;
  } catch (error: any) {
    console.error('Get user API error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const logout = (): void => {
  removeAuthToken();
}; 