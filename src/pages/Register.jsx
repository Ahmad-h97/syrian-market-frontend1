import { useState } from 'react';
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

  const onSubmit = async (data) => {
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("Email", data.Email);
      formData.append("password", data.password);
      formData.append("city", data.city);

      if (data.profileImage && data.profileImage.length > 0) {
        formData.append("profileImage", data.profileImage[0]);
      }

      const res = await api.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
                message: "Password must be at least 8 characters",
              },
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

        {/* Added file input */}
        <div className={styles.field}>
          <input
            type="file"
            accept="image/*"
            {...register("profileImage")}
            className={styles.input}
          />
          {errors.profileImage && (
            <p className={styles.error}>{errors.profileImage.message}</p>
          )}
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
