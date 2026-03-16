import { useState, useRef } from 'react';
import { SERVICE_CATEGORIES } from '../../constants/pricing';
import pkgPower   from '../../assets/images/package-power.png';
import pkgMicro   from '../../assets/images/package-micro.png';
import pkgChassis from '../../assets/images/package-chassis.png';
import styles from './Pricing.module.css';

const PACKAGE_IMAGES = [
  { src: pkgPower,   alt: '動力覺醒套餐' },
  { src: pkgMicro,   alt: '微動力升級方案' },
  { src: pkgChassis, alt: '控骨力套餐' },
];

// ── 圖片 Swiper ───────────────────────────────────────
function PackageSwiper() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);

  const goTo = (index) => {
    setCurrent(index);
    trackRef.current?.children[index]?.scrollIntoView({
      behavior: 'smooth', block: 'nearest', inline: 'center',
    });
  };

  const prev = () => goTo((current - 1 + PACKAGE_IMAGES.length) % PACKAGE_IMAGES.length);
  const next = () => goTo((current + 1) % PACKAGE_IMAGES.length);

  return (
    <div className={styles.swiper}>
      {/* 圖片軌道 */}
      <div className={styles.swiperTrack} ref={trackRef}>
        {PACKAGE_IMAGES.map((img, i) => (
          <div key={i} className={styles.swiperSlide}>
            <img src={img.src} alt={img.alt} className={styles.swiperImg} />
          </div>
        ))}
      </div>

      {/* 左右箭頭 */}
      <button className={`${styles.swiperArrow} ${styles.swiperPrev}`} onClick={prev} aria-label="上一張">
        &#8249;
      </button>
      <button className={`${styles.swiperArrow} ${styles.swiperNext}`} onClick={next} aria-label="下一張">
        &#8250;
      </button>

      {/* 指示點 */}
      <div className={styles.swiperDots}>
        {PACKAGE_IMAGES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`第 ${i + 1} 張`}
          />
        ))}
      </div>
    </div>
  );
}

// ── 服務分類表格 ──────────────────────────────────────
function ServiceTable({ category }) {
  return (
    <div className={styles.serviceCard} id={category.id}>
      <h3 className={styles.serviceTitle}>
        <span className={styles.serviceIcon}>{category.icon}</span>
        {category.title}
      </h3>
      {/* 包一層 scrollable wrapper 讓手機可以左右滑 */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>項目</th>
              <th>價格（NTD）</th>
              <th>備註</th>
            </tr>
          </thead>
          <tbody>
            {category.items.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td className={styles.priceCell}>{item.price}</td>
                <td className={styles.noteCell}>{item.note || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── 頁面主體 ──────────────────────────────────────────
export default function Pricing() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className={styles.page}>
      {/* Page Hero */}
      <div className={styles.pageHero}>
        <div className={styles.heroNoise} />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>SERVICES & PRICING</span>
          <h1 className={styles.heroTitle}>服務項目</h1>
          <p className={styles.heroSub}>jspace 車款 · 客製化改裝 · 一條龍服務</p>
        </div>
      </div>

      {/* Tab 切換 */}
      <div className={styles.tabs}>
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('all')}
          >
            📋 完整項目表
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'packages' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            ⚡ 優惠套餐
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {/* ── 完整項目表 ── */}
        {activeTab === 'all' && (
          <div className={styles.container}>
            <div className={styles.catNav}>
              {SERVICE_CATEGORIES.map(cat => (
                <a key={cat.id} href={`#${cat.id}`} className={styles.catNavItem}>
                  {cat.icon} {cat.title}
                </a>
              ))}
            </div>
            <p className={styles.sectionNote}>
              所有價格以實際施作為準，客製化需求請透過官方 LINE 詢價。
            </p>
            <div className={styles.serviceList}>
              {SERVICE_CATEGORIES.map(cat => (
                <ServiceTable key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        )}

        {/* ── 優惠套餐 ── */}
        {activeTab === 'packages' && (
          <div className={styles.pkgSection}>
            <p className={styles.pkgNote}>
              以下套餐為組合優惠價，可依需求選擇單品或搭配組合。
            </p>
            <PackageSwiper />
          </div>
        )}
      </div>

      {/* 底部聯絡 CTA */}
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaTitle}>想了解更多或預約施工？</p>
          <a
            href="https://lin.ee/t5Agxe2"
            target="_blank"
            rel="noreferrer"
            className={styles.ctaBtn}
          >
            加入官方 LINE 詢問
          </a>
        </div>
      </div>
    </div>
  );
}
