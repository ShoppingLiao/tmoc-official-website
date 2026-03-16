import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo.webp';
import lineQr from '../../assets/images/line-qrcode.png';
import styles from './Home.module.css';

function Hero() {
  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroNoise} />
      <div className={styles.heroContent}>
        <div className={styles.heroLogoWrap}>
          <img src={logoImg} alt="TMOC Logo" className={styles.heroLogo} />
        </div>
        <h1 className={styles.heroTitle}>鐵皮車庫</h1>
        <p className={styles.heroSubtitle}>改裝 · 升級 · 一條龍服務</p>
        <div className={styles.heroCtas}>
          <Link to="/pricing" className={styles.ctaPrimary}>查看服務項目</Link>
          <a href="#" onClick={scrollToContact} className={styles.ctaSecondary}>聯絡我們</a>
        </div>
      </div>
      <div className={styles.heroScroll}><span /></div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>ABOUT US</span>
          <h2 className={styles.sectionTitle}>關於我們</h2>
        </div>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <p>
              TMOC 鐵皮車庫，位於台中沙鹿，專注於 jspace 車款的客製化改裝服務。
              從動力升級、底盤調校、外觀改裝到露營配備，提供一條龍完整解決方案。
            </p>
            <p>
              我們相信每輛車都有屬於自己的個性，讓你的座駕不只是交通工具，更是生活方式的延伸。
            </p>
            <div className={styles.aboutInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>地址</span>
                <span>台中市沙鹿區鎮南路一段 233 號</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>車款</span>
                <span>jspace 專屬改裝</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>服務</span>
                <span>動力 / 底盤 / 外觀 / 露營 / 音響 · · ·</span>
              </div>
            </div>
          </div>
          <div className={styles.aboutLogoWrap}>
            <img src={logoImg} alt="TMOC" className={styles.aboutLogoImg} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className={`${styles.section} ${styles.sectionDark}`}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>CONTACT</span>
          <h2 className={styles.sectionTitle}>聯絡我們</h2>
        </div>

        <div className={styles.contactTop}>
          <div className={styles.contactInfo}>
            <p className={styles.contactDesc}>
              有任何改裝需求或想了解更多服務項目，歡迎透過官方 LINE 聯繫我們，
              我們會盡快為您提供專業建議。
            </p>
            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>地址</span>
                <span>台中市沙鹿區鎮南路一段 233 號</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>LINE</span>
                <a href="https://lin.ee/t5Agxe2" target="_blank" rel="noreferrer" className={styles.contactLink}>
                  lin.ee/t5Agxe2
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>YouTube</span>
                <a href="https://www.youtube.com/@%E9%90%B5%E7%9A%AE%E8%BB%8A%E5%BA%AB" target="_blank" rel="noreferrer" className={styles.contactLink}>
                  @鐵皮車庫
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>TikTok</span>
                <a href="https://www.tiktok.com/@tmoc2209" target="_blank" rel="noreferrer" className={styles.contactLink}>
                  @tmoc2209
                </a>
              </div>
            </div>
          </div>
          <div className={styles.contactQr}>
            <img src={lineQr} alt="官方 Line QRCode" />
            <p>掃描加入官方 LINE</p>
          </div>
        </div>

        {/* Google Maps */}
        <div className={styles.mapWrap}>
          <iframe
            title="鐵皮車庫地圖"
            src="https://maps.google.com/maps?q=台中市沙鹿區鎮南路一段233號&output=embed&z=16&hl=zh-TW"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      {/* <Events />  施工中，暫時隱藏 */}
      {/* <Gallery /> 施工中，暫時隱藏 */}
      <Contact />
    </>
  );
}
