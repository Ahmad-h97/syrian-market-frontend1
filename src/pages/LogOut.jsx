import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'; // adjust path as needed
import api from '../utils/axiosInstance';


export default function LogoutButton() {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', {}, {
        withCredentials: true, // important if you're using cookies
      });

      clearAuth();        // remove accessToken from Zustand
      navigate('/login'); // send user to login page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}