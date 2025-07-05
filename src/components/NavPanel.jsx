import { useEffect, useRef } from "react";
import styles from "./NavPanel.module.css";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import ThemeToggle from './ThemeToggle';


export default function NavPanel({ isOpen, closePanel, buttonRef }) {
  const panelRef = useRef(null);
  const { accessToken, logout, user, userId } = useAuthStore();
  const isLoggedIn = !!userId;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        closePanel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePanel, buttonRef]);

  if (!isOpen) return null;

  return (
    <div className={styles.panel} ref={panelRef}>
      <div className={styles.content}>
        {accessToken ? (
          <>
            <button onClick={closePanel} className={styles.closeBtn}>X</button>
            <Link onClick={closePanel} to="/profile">👤 My Profile</Link>
            <Link onClick={closePanel} >⚙️ Settings</Link>
            <Link onClick={closePanel} >📦 My Listings</Link>
            <Link onClick={closePanel} to="/logout">Logout</Link>
            
          </>
        ) : (
          <>
            <Link onClick={closePanel} to="/login">🔐 Login</Link>
            <Link onClick={closePanel} to="/register">📝 Register</Link>
          </>
        )}
        <hr />
        <ThemeToggle  /> {/* 🌗 Dark Mode switch */}
  
        <Link onClick={closePanel} to="/compress">❓ Help</Link>
      </div>
    </div>
  );
}
