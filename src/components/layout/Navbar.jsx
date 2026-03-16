import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../../constants/nav';
import logoImg from '../../assets/images/logo.webp';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const scrollToId = (id) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAnchorClick = (e, to) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = to.replace('/#', '');
    if (location.pathname !== '/') {
      navigate('/');
      // 等 Home 頁面 mount 後再 scroll
      setTimeout(() => scrollToId(id), 200);
    } else {
      scrollToId(id);
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
              {link.to.startsWith('/#') ? (
                <a
                  href="#"
                  onClick={(e) => handleAnchorClick(e, link.to)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.to}
                  className={location.pathname === link.to ? styles.active : ''}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
