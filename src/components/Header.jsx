import { NavLink } from 'react-router-dom';
import { FaRegUser, FaGripLines } from 'react-icons/fa';
import { FiPlus } from "react-icons/fi";
import styles from './Header.module.css';
import { useAuthStore } from '../store/authStore';
import { useEffect, useState, useRef } from "react";
import Logo from './logo';
import NavPanel from './NavPanel';

function Header() {
  const [showHeader, setshowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && showHeader && currentScrollY > 50) {
        setshowHeader(false);
      } else if (currentScrollY < lastScrollY.current && !showHeader) {
        setshowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showHeader]);

  const user = useAuthStore((state) => state.user);
  const userId = useAuthStore((state) => state.userId);
  const isLoggedIn = !!userId;
  const profileImage = user?.profileImage;

  const togglePanel = () => setIsOpen(prev => !prev);

  return (
    <header className={styles.header}>
      <nav className={styles.headerNav}>
        <NavLink to="/" className={styles.logo}>
          <Logo width={70} height={70} />
        </NavLink>

        <div className={styles.navActions}>
          <NavLink to="/post-house" className={styles.navButton}>
            <div>
              <FiPlus className={styles.navIcon} />
            </div>
            <span className={`${styles.navLabel} ${!showHeader ? styles.hide : ''}`}>add house</span>
          </NavLink>

          <button
            ref={buttonRef}
            onClick={togglePanel}
            className={styles.navButton}
          >
            <div>
              {isLoggedIn ? (
                profileImage ? (
                  <div className={styles.profileCircle}>
                    <img
                      src={profileImage}
                      alt="User"
                      className={styles.profileImg}
                    />
                  </div>
                ) : (
                  <FaRegUser className={styles.navIcon} />
                )
              ) : (
                <FaGripLines className={styles.navIcon} />
              )}
            </div>
            <span className={`${styles.navLabel} ${!showHeader ? styles.hide : ''}`}>
              {isLoggedIn ? "Profile" : "Login"}
            </span>
          </button>

          <NavPanel isOpen={isOpen} buttonRef={buttonRef} closePanel={() => setIsOpen(false)} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
