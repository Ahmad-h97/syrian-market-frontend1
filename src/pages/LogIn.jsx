import {useState} from 'react';
import api from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import styles from "./Auth.module.css";


export default function LogIn() {
  const navigate = useNavigate();


   const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log('Request data:', formData);
  

   try {
  const res = await api.post('/auth/login', formData);
  console.log('Success response:', res.data);
  setMessage(res.data.message); // Success message from backend

  
    const accessToken = res.data.accessToken;
    const user = res.data.user;
    if (accessToken) {
    const decoded = jwtDecode(accessToken);  // decode it
    console.log('Decoded token:', decoded);
  
    useAuthStore.getState().setAuthData({
      token: accessToken,
      id: decoded.id,
      user,
      
    });
    console.log(decoded.id)
  }
navigate("/");
  

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
      <h2 className={styles.title}>Log in</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
            
          <input
          type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.button}>Login</button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    <hr className={styles.hr} />
      <div className={styles.linkText}>
        <p className={styles.pText}>Don't have an account?{" "}</p>
        <Link to="/register" className={styles.link}>
          Sign up
        </Link>
      </div>
    </div>
  );
}






