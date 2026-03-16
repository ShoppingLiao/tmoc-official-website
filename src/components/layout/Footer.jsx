import lineQr from '../../assets/images/line-qrcode.png';
import logoImg from '../../assets/images/logo.webp';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@%E9%90%B5%E7%9A%AE%E8%BB%8A%E5%BA%AB',
    // YouTube icon (SVG path)
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
      </svg>
    ),
    color: '#ff0000',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@tmoc2209',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M19.6 3a4.7 4.7 0 0 1-4.7-4.7h-3.4v13.8a2.8 2.8 0 1 1-2-2.7V5.9a6.2 6.2 0 1 0 5.4 6.1V8.3a8 8 0 0 0 4.7 1.5V6.4A4.7 4.7 0 0 1 19.6 3z"/>
      </svg>
    ),
    color: '#ffffff',
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img src={logoImg} alt="TMOC Logo" className={styles.brandLogo} />
          <div>
            <p className={styles.brandName}>TMOC 鐵皮車庫</p>
            <p className={styles.address}>台中市沙鹿區鎮南路一段 233 號</p>
            <div className={styles.socialLinks}>
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialBtn}
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.lineBlock}>
          <p className={styles.lineLabel}>官方 LINE</p>
          <img src={lineQr} alt="官方 Line QRCode" className={styles.qr} />
          <a href="https://lin.ee/t5Agxe2" target="_blank" rel="noreferrer" className={styles.lineLink}>
            加入好友
          </a>
        </div>
      </div>
      <p className={styles.copy}>© {new Date().getFullYear()} TMOC 鐵皮車庫. All rights reserved.</p>
    </footer>
  );
}
