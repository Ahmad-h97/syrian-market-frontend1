import {useState} from 'react';
import api from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { jwtDecode } from 'jwt-decode';
import styles from "./Auth.module.css";


export default function Register() {
  const navigate = useNavigate();


   const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    code: '',
    email: ''
  });

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log('Request data:', formData);
  

   try {
  const res = await api.post('auth/verify-email', formData);
  console.log('Success response:', res);
  setMessage(res.data.message); // Success message from backend

  const accessToken = res.data.accessToken;
  if (accessToken) {
  const decoded = jwtDecode(accessToken);  // decode it
  console.log('Decoded token:', decoded);

  useAuthStore.getState().setAuthData({
    token: accessToken,
    id: decoded.id,
  });
}

    console.log('Saved token:', useAuthStore.getState().accessToken);
    console.log('Saved user ID:', useAuthStore.getState().userId);

    if (res.data.nextStep) {
    // redirect to verification page
   navigate(res.data.nextStep);
  }

} catch (err) {
   console.log(err.response?.data || err.message);
  if (err.response && err.response.data && err.response.data.message) {
    // Error response from backend
    setMessage(err.response.data.message);
  } else if (err.message) {
    // Frontend or network error (e.g. server down)
    setMessage(err.message);
  } else {
    setMessage('Something went wrong.');
  }
}
  };

return (
    <div className={styles.container}>
      <h2 className={styles.title}>Verify Email</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <input
            name="code"
            placeholder="Verification Code"
            value={formData.code}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.button}>Verify</button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}


