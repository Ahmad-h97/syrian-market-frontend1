import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function FooterNavItem({ href, label, Icon }) {
  return (
    <Link to={href} className={styles['footer-nav__link']}>
      <div className={styles['footer-nav__icon-wrapper']}>
        <Icon className={styles['footer-nav__icon']} size={24} />
      </div>
      <div className={styles['footer-nav__label']}>{label}</div>
    </Link>
  );
}

export default FooterNavItem;
