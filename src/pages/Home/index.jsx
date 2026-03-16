import styles from './Home.module.css';

function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>Taiwan Metal Owners Club</p>
        <h1 className={styles.heroTitle}>
          TMOC<br /><span>鐵皮車庫</span>
        </h1>
        <p className={styles.heroSubtitle}>
          台灣金屬車主同好會，分享熱情、記錄旅途。
        </p>
        <a href="#about" className={styles.heroCta}>了解更多</a>
      </div>
      {/* 背景影片或圖片放這裡 */}
      <div className={styles.heroOverlay} />
    </section>
  );
}

function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>關於我們</h2>
        <p className={styles.sectionDesc}>
          {/* 待填入介紹文字 */}
          TMOC 鐵皮車庫是一群熱愛金屬車輛的同好所組成的社群，
          致力於記錄每一次出行的故事與回憶。
        </p>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section id="events" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>活動紀錄</h2>
        <p className={styles.sectionDesc}>即將放入活動紀錄內容。</p>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>相簿</h2>
        <p className={styles.sectionDesc}>即將放入相片素材。</p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>聯絡我們</h2>
        <p className={styles.sectionDesc}>即將放入聯絡方式。</p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Events />
      <Gallery />
      <Contact />
    </>
  );
}
