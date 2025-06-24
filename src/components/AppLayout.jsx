// src/components/AppLayout.jsx
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import styles from'./AppLayout.module.css';
import LoadingLogo from './LoadingLogo';
import { useEffect, useState } from 'react';


export default function AppLayout({ children }) {

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLoading(false), 3000); // Simulate loading
    return () => clearTimeout(timeout);
  }, []);


  return (
    <div className={styles.appLayout}>
      {/* ✅ This always renders, so Home can fetch immediately */}
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <Footer />

      {/* ✅ Overlay on top of everything */}
      {showLoading && (
        <div className={styles.fullPage}>
          <LoadingLogo />
        </div>
      )}
    </div>
  );
}

