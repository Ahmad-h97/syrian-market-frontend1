import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css'; // use your CSS module

export default function ThemeToggle({ closePanel }) {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
  console.log("isDark changed to:", isDark);
  if (isDark) {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}, [isDark]);

const toggleTheme = () => {
  console.log("Toggling theme...");
  setIsDark(prev => !prev);
  if (closePanel) closePanel();
};

  return (
    <div className={styles.toggleWrapper}>
      <span className={styles.label}>{isDark ? '🌙 Dark' : '☀️ Light'}</span>
      <label className={styles.switch}>
        <input type="checkbox" checked={isDark} onChange={toggleTheme} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}
