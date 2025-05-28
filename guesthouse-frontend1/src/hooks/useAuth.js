import { useContext } from 'react';
import { AuthContext, useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const context = useAuthContext();
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    user: context.user,
    loading: context.loading,
    login: context.login,
    logout: context.logout,
    isAuthenticated: !!context.user,
    isAdmin: context.user?.role === 'admin'
  };
};