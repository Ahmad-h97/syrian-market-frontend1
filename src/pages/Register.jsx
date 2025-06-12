import {useState} from 'react';
import api from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from "./Auth.module.css";

export default function Register() {
  const navigate = useNavigate();


   const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    Email: '',
    password: '',
    city:''
  });

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log('Request data:', formData);
  

   try {
  const res = await api.post('/auth/register', formData);
  console.log('Success response:', res);
  setMessage(res.data.message); // Success message from backend

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
      <h2 className={styles.title}>Register</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            
          />
        </div>

        <div className={styles.field}>
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            className={styles.input}
            required
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
            required
          />
        </div>

        <div className={styles.field}>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={styles.input}
            
          >
          <option value="" disabled>Select your city</option>
    <option value="Damascus">Damascus</option>
    <option value="Aleppo">Aleppo</option>
    <option value="Homs">Homs</option>
    <option value="Hama">Hama</option>
    <option value="Latakia">Latakia</option>
    <option value="Tartus">Tartus</option>
    <option value="Raqqa">Raqqa</option>
    <option value="Deir ez-Zor">Deir ez-Zor</option>
    <option value="Daraa">Daraa</option>
    <option value="Hasakah">Hasakah</option>
    <option value="Damascus">Damascus</option>
    <option value="Aleppo">Aleppo</option>
    <option value="Homs">Homs</option>
    <option value="Hama">Hama</option>
    <option value="Latakia">Latakia</option>
    <option value="Tartus">Tartus</option>
    <option value="Raqqa">Raqqa</option>
    <option value="Deir ez-Zor">Deir ez-Zor</option>
    <option value="Daraa">Daraa</option>
    <option value="Hasakah">Hasakah</option>
  </select>
        </div>

        <div className={styles.field}>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
          
          />
        </div>

        <button type="submit" className={styles.button}>Sign Up</button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
      <hr className={styles.hr} />

      <div className={styles.linkText}>
        <p className={styles.pText}>Already have an account?{" "}</p>
        <Link to="/login" className={styles.link}>Log in</Link>
      </div>
    </div>
  );
}










/*import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axios'; // your configured axios instance

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', formData);
      navigate('/login'); // or auto-login later
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
*/