import { authService } from './api';

export const authenticate = async (credentials) => {
  try {
    const response = await authService.login(credentials);
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logoutUser = async () => {
  try {
    await authService.logout();
  } finally {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

export const checkAuth = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await authService.refreshToken();
    localStorage.setItem('authToken', response.data.token);
    return JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    logoutUser();
    throw new Error('Session expired');
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
