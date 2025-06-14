import {useState} from 'react';
import api from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from "./Auth.module.css";
import { useForm } from "react-hook-form";

export default function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setMessage("");

    try {
      console.log("form data",formData)
      const res = await api.post("/auth/register", formData);
      setMessage(res.data.message);

      if (res.data.nextStep) {
        navigate(res.data.nextStep);
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || err.message || "Something went wrong."
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className={`${styles.input} ${errors.username ? styles.invalid : ""}`}
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <input
            type="email"
            placeholder="Email"
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className={`${styles.input} ${errors.Email ? styles.invalid : ""}`}
          />
          {errors.Email && (
            <p className={styles.error}>{errors.Email.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <input
            type="password"
            placeholder="Password"
             {...register("password", { 
    required: "Password is required", 
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters"
    }
  })}
            className={`${styles.input} ${errors.password ? styles.invalid : ""}`}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <select
            {...register("city", { required: "City is required" })}
            className={`${styles.input} ${errors.city ? styles.invalid : ""}`}
            defaultValue=""
          >
            <option value="" disabled>
              Select your City
            </option>
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
          {errors.city && <p className={styles.error}>{errors.city.message}</p>}
        </div>

        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>

      {message && <p className={styles.message}>{message}</p>}

      <hr className={styles.hr} />

      <div className={styles.linkText}>
        <p className={styles.pText}>Already have an account? </p>
        <Link to="/login" className={styles.link}>
          Log in
        </Link>
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