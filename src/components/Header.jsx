import { NavLink } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { FiPlus } from "react-icons/fi";
import styles from './Header.module.css';
import { useAuthStore } from '../store/authStore';
import { useEffect, useState,useRef } from "react";


function Header() {

  const [showHeader, setshowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY.current && showHeader && currentScrollY > 50) {
    // Scrolling down and past 30px -> hide footer
    setshowHeader(false);
  } else if (currentScrollY < lastScrollY.current && !showHeader) {
    // Scrolling up and footer hidden -> show footer
    setshowHeader(true);
  }

  lastScrollY.current = currentScrollY;
};
     window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showHeader]);


const userId = useAuthStore((state) => state.userId);
const isLoggedIn = !!userId;
   
  return (
   <header className={styles.header}>

 <nav className={styles['header-nav']}>
    <NavLink to= "/" className={styles.logo}>
      🏡
    </NavLink>
  

  
    <div className={styles['nav-actions']}>
    <NavLink to="/post-house" className={styles['nav-button']}>
      <div>
        <FiPlus className={styles['nav-icon']} />
      </div>
      
      <span className={`${styles['nav-label']} ${!showHeader ? styles.hide : ''}`}>add house</span>
    </NavLink>

    
    <NavLink to={isLoggedIn ? "/profile" : "/login"} className={styles['profile-button']}>
          <div className={styles['profile-circle']}>
            {isLoggedIn && userId?.avatar ? (
              <img
                src={user.avatar}
                alt="User"
                className={styles['profile-img']}
              />
              
            ) : (
              <FaRegUser className={styles['profile-icon']} />
            )}
          </div>
          <span className={`${styles['nav-label']} ${!showHeader ? styles.hide : ''}`}>
      {isLoggedIn ? 'Profile' : 'Login'}
    </span>
        </NavLink>
    </div>
  </nav>
</header>

  );
}

export default Header;
