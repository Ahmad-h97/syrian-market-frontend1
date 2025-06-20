import { MdExplore } from "react-icons/md";
import { FaHeart, FaSignInAlt } from "react-icons/fa";
import FooterNavItem from "./FooterNavItem";
import styles from './Footer.module.css';
import { useEffect, useState,useRef } from "react";

function Footer() {

  const [showFooter, setShowFooter] = useState(true);
  

const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY.current && showFooter && currentScrollY > 50) {
    // Scrolling down and past 30px -> hide footer
    setShowFooter(false);
  } else if (currentScrollY < lastScrollY.current && !showFooter) {
    // Scrolling up and footer hidden -> show footer
    setShowFooter(true);
  }
    

  lastScrollY.current = currentScrollY;
};
     window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showFooter]);


  return (
     <footer className={`${styles.footer} ${showFooter ? styles.show : styles.hide}`}>
      <nav className={styles['footer-nav']} aria-label="Footer navigation">
        <FooterNavItem href="logout" label="logout" Icon={MdExplore} />
        <FooterNavItem href="/wishlists" label="Wishlists" Icon={FaHeart} />
        <FooterNavItem href="/login" label="Log in" Icon={FaSignInAlt} />
      </nav>
    </footer>
  );
}

export default Footer;