import { useState, useRef, useEffect } from 'react';
import { PACKAGES, SERVICE_CATEGORIES } from '../../constants/pricing';
import pkgPower   from '../../assets/images/package-power.webp';
import pkgMicro   from '../../assets/images/package-micro.webp';
import pkgChassis from '../../assets/images/package-chassis.webp';
import styles from './Pricing.module.css';

const PKG_DATA = [
  { ...PACKAGES[0], src: pkgPower },
  { ...PACKAGES[1], src: pkgMicro },
  { ...PACKAGES[2], src: pkgChassis },
];

// ── Lightbox ──────────────────────────────────────────
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={styles.lightbox} onClick={onClose}>
      <button className={styles.lightboxClose} onClick={onClose} aria-label="關閉">&#x2715;</button>
      <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className={styles.lightboxImg} />
        <p className={styles.lightboxCaption}>{alt}</p>
      </div>
    </div>
  );
}

// ── Package Swiper ────────────────────────────────────
function PackageSwiper() {
  const [current, setCurrent]   = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const trackRef = useRef(null);

  const goTo = (index) => {
    setCurrent(index);
    trackRef.current?.children[index]?.scrollIntoView({
      behavior: 'smooth', block: 'nearest', inline: 'center',
    });
  };

  const prev = () => goTo((current - 1 + PKG_DATA.length) % PKG_DATA.length);
  const next = () => goTo((current + 1) % PKG_DATA.length);
  const pkg  = PKG_DATA[current];

  return (
    <>
      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}

      <div className={styles.swiper}>
        <div className={styles.swiperTrack} ref={trackRef}>
          {PKG_DATA.map((item, i) => (
            <div key={i} className={styles.swiperSlide}>
              <img
                src={item.src} alt={item.title}
                className={styles.swiperImg}
                onClick={() => setLightbox({ src: item.src, alt: item.title })}
                title="點擊放大"
              />
            </div>
          ))}
        </div>
        <button className={`${styles.swiperArrow} ${styles.swiperPrev}`} onClick={prev} aria-label="上一張">&#8249;</button>
        <button className={`${styles.swiperArrow} ${styles.swiperNext}`} onClick={next} aria-label="下一張">&#8250;</button>
        <div className={styles.swiperDots}>
          {PKG_DATA.map((_, i) => (
            <button key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => goTo(i)} aria-label={`第 ${i + 1} 張`}
            />
          ))}
        </div>
      </div>

      {/* 套餐文字說明 */}
      <div className={styles.pkgDetail}>
        <div className={styles.pkgDetailHeader}>
          {pkg.subtitle && <p className={styles.pkgSubtitle}>{pkg.subtitle}</p>}
          <h3 className={styles.pkgTitle}>{pkg.title}</h3>
        </div>
        <ul className={styles.pkgItems}>
          {pkg.items.map(item => (
            <li key={item.no} className={styles.pkgItem}>
              <span className={styles.pkgItemNo}>{item.no}.</span>
              <span className={styles.pkgItemName}>{item.name}</span>
              <span className={styles.pkgItemPrice}>$ {item.price.toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className={styles.pkgDivider} />
        <div className={styles.combos}>
          {pkg.combos.map(combo => (
            <div key={combo.label} className={styles.combo}>
              <span className={styles.comboLabel}>{combo.label}</span>
              <span className={styles.comboDesc}>{combo.desc}</span>
              <span className={styles.comboPrice}>${combo.price.toLocaleString()}</span>
              <span className={styles.comboSave}>現省 {combo.save.toLocaleString()}</span>
            </div>
          ))}
        </div>
        {pkg.notes.length > 0 && (
          <div className={styles.pkgNotes}>
            {pkg.notes.map(note => (
              <div key={note.name} className={styles.pkgNote}>
                <span className={styles.pkgNoteName}>{note.name}</span>
                <p className={styles.pkgNoteDesc}>{note.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// ── ServiceTable ──────────────────────────────────────
function ServiceTable({ category }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
      <div className={styles.serviceCard} id={category.id}>
        <h3 className={styles.serviceTitle}>{category.title}</h3>
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
                <tr
                  key={i}
                  className={item.image ? styles.rowClickable : ''}
                  onClick={item.image ? () => setLightbox({ src: item.image, alt: item.name }) : undefined}
                  title={item.image ? '點擊查看產品照片' : undefined}
                >
                  <td>
                    {item.name}
                    {item.image && <span className={styles.cameraIcon}>&#128247;</span>}
                  </td>
                  <td className={styles.priceCell}>{item.price}</td>
                  <td className={styles.noteCell}>{item.note || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ── Go To Top ─────────────────────────────────────────
function GoToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`${styles.goTop} ${visible ? styles.goTopVisible : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="回到頂部"
    >
      &#8679;
    </button>
  );
}

// ── Page ──────────────────────────────────────────────
export default function Pricing() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className={styles.page}>
      <div className={styles.pageHero}>
        <div className={styles.heroNoise} />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>SERVICES & PRICING</span>
          <h1 className={styles.heroTitle}>服務項目</h1>
          <p className={styles.heroSub}>jspace 車款 · 客製化改裝 · 一條龍服務</p>
        </div>
      </div>

      <div className={styles.tabs}>
        <div className={styles.tabContainer}>
          <button className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`} onClick={() => setActiveTab('all')}>
            完整項目表
          </button>
          <button className={`${styles.tab} ${activeTab === 'packages' ? styles.tabActive : ''}`} onClick={() => setActiveTab('packages')}>
            優惠套餐
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {activeTab === 'all' && (
          <div className={styles.container}>
            <div className={styles.catNav}>
              {SERVICE_CATEGORIES.map(cat => (
                <a key={cat.id} href={`#${cat.id}`} className={styles.catNavItem}>{cat.title}</a>
              ))}
            </div>
            <p className={styles.sectionNote}>
              所有價格以實際施作為準，客製化需求請透過官方 LINE 詢價。有
              <span className={styles.cameraHint}>&#128247;</span>圖示的品項可點擊查看產品照片。
            </p>
            <div className={styles.serviceList}>
              {SERVICE_CATEGORIES.map(cat => (
                <ServiceTable key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'packages' && (
          <div className={styles.pkgSection}>
            <p className={styles.pkgNote}>以下套餐為組合優惠價，可依需求選擇單品或搭配組合。</p>
            <PackageSwiper />
          </div>
        )}
      </div>

      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaTitle}>想了解更多或預約施工？</p>
          <a href="https://lin.ee/t5Agxe2" target="_blank" rel="noreferrer" className={styles.ctaBtn}>
            加入官方 LINE 詢問
          </a>
        </div>
      </div>

      <GoToTop />
    </div>
  );
}
