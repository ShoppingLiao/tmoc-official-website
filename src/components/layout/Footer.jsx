import lineQr from '../../assets/images/line-qrcode.png';
import logoImg from '../../assets/images/logo.jpg';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img src={logoImg} alt="TMOC Logo" className={styles.brandLogo} />
          <div>
            <p className={styles.brandName}>TMOC 鐵皮車庫</p>
            <p className={styles.brandSub}>Taiwan Metal Owners Club</p>
            <p className={styles.address}>台中市沙鹿區鎮南路一段 233 號</p>
          </div>
        </div>

        <div className={styles.lineBlock}>
          <p className={styles.lineLabel}>官方 LINE</p>
          <img src={lineQr} alt="官方 Line QRCode" className={styles.qr} />
          <a
            href="https://lin.ee/t5Agxe2"
            target="_blank"
            rel="noreferrer"
            className={styles.lineLink}
          >
            加入好友
          </a>
        </div>
      </div>
      <p className={styles.copy}>© {new Date().getFullYear()} TMOC 鐵皮車庫. All rights reserved.</p>
    </footer>
  );
}
