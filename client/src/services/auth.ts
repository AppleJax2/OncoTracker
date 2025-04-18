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
    name?: string;
    address?: string;
    phone?: string;
  };
}

interface AuthResponse {
  token: string;
  user: User;
}

export const login = async (loginData: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', loginData);
  return response.data;
};

export const register = async (registerData: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', registerData);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/auth/me');
  return response.data;
}; 