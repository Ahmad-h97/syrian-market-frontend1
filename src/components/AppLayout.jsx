// src/components/AppLayout.jsx
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import styles from'./AppLayout.module.css';

export default function AppLayout({ children }) {
  return (
    <div className={styles.appLayout}>
      <Header />
      <main className={styles.mainContent}>{children} <Outlet/></main>
        
      <Footer />
    </div>
  );
}

