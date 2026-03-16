import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.brand}>TMOC 鐵皮車庫</p>
        <p className={styles.copy}>© {new Date().getFullYear()} TMOC. All rights reserved.</p>
      </div>
    </footer>
  );
}
