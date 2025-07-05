import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosInstance'; // your axios instance
import { useAuthStore } from '../store/authStore'; // your Zustand auth store

export default function LogoutButton({ closePanel }) {
  const clearAuth = useAuthStore(state => state.clearAuth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call backend to logout (cookies/session)
      await api.post('/auth/logout', {}, { withCredentials: true });

      // Clear auth data in Zustand store
      clearAuth();

      // Remove keys from localStorage to fully clear saved data
      localStorage.removeItem('auth-storage');
      localStorage.removeItem('filter-storage');
      // Add other keys you want to clear here...

      // Optional: close any open panel
      if (closePanel) closePanel();

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Optional: show error to user here
    }
  };

  return <button onClick={handleLogout}>🚪 Logout</button>;
}
