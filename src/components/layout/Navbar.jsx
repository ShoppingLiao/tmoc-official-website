import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../constants/nav';
import logoImg from '../../assets/images/logo.jpg';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleNavClick = (to) => {
    setMenuOpen(false);
    if (to.startsWith('/#')) {
      const id = to.slice(2);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={logoImg} alt="TMOC Logo" className={styles.logoImg} />
          <span className={styles.logoText}>鐵皮車庫</span>
        </Link>

        <button
          className={`${styles.menuBtn} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="選單"
        >
          <span /><span /><span />
        </button>

        <ul className={`${styles.navList} ${menuOpen ? styles.navOpen : ''}`}>
          {NAV_LINKS.map(link => (
            <li key={link.to}>
              {link.to.startsWith('/') && !link.to.startsWith('/#') ? (
                <Link
                  to={link.to}
                  className={location.pathname === link.to ? styles.active : ''}
                  onClick={() => handleNavClick(link.to)}
                >
                  {link.label}
                </Link>
              ) : (
                <a href={link.to} onClick={() => handleNavClick(link.to)}>
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
