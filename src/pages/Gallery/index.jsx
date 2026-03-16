import { useState, useEffect } from 'react';
import { GALLERY_ITEMS, GALLERY_TAGS } from '../../constants/gallery';
import styles from './Gallery.module.css';

// ── Lightbox ──────────────────────────────────────────
function Lightbox({ item, items, onClose }) {
  const [current, setCurrent] = useState(items.indexOf(item));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')    onClose();
      if (e.key === 'ArrowLeft')  setCurrent(i => (i - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % items.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, items]);

  const cur = items[current];

  return (
    <div className={styles.lightbox} onClick={onClose}>
      <button className={styles.lightboxClose} onClick={onClose} aria-label="關閉">&#x2715;</button>

      {items.length > 1 && (
        <>
          <button className={`${styles.lbArrow} ${styles.lbPrev}`}
            onClick={(e) => { e.stopPropagation(); setCurrent(i => (i - 1 + items.length) % items.length); }}
            aria-label="上一張">&#8249;</button>
          <button className={`${styles.lbArrow} ${styles.lbNext}`}
            onClick={(e) => { e.stopPropagation(); setCurrent(i => (i + 1) % items.length); }}
            aria-label="下一張">&#8250;</button>
        </>
      )}

      <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
        <img src={cur.image} alt={cur.title} className={styles.lightboxImg} />
        <p className={styles.lightboxCaption}>
          {cur.title}
          {items.length > 1 && <span className={styles.lbCounter}> {current + 1} / {items.length}</span>}
        </p>
      </div>
    </div>
  );
}

// ── Gallery Grid ──────────────────────────────────────
export default function Gallery() {
  const [activeTag, setActiveTag]   = useState('all');
  const [lightboxItem, setLightbox] = useState(null);

  const filtered = activeTag === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.tags.includes(activeTag));

  const isEmpty = GALLERY_ITEMS.length === 0;

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.pageHero}>
        <div className={styles.heroNoise} />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>GALLERY</span>
          <h1 className={styles.heroTitle}>作品相簿</h1>
          <p className={styles.heroSub}>車主改裝實例 · jspace 客製化</p>
        </div>
      </div>

      {/* Tag 篩選 */}
      {!isEmpty && (
        <div className={styles.tagBar}>
          <div className={styles.tagContainer}>
            {GALLERY_TAGS.map(tag => (
              <button
                key={tag.id}
                className={`${styles.tagBtn} ${activeTag === tag.id ? styles.tagActive : ''}`}
                onClick={() => setActiveTag(tag.id)}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className={styles.content}>
        <div className={styles.container}>
          {isEmpty ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>相簿整理中</p>
              <p className={styles.emptyDesc}>精彩改裝作品即將上線，敬請期待。</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyDesc}>此分類目前沒有照片。</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map(item => (
                <div
                  key={item.id}
                  className={styles.gridItem}
                  onClick={() => setLightbox(item)}
                >
                  <img
                    src={item.thumb || item.image}
                    alt={item.title}
                    className={styles.gridImg}
                    loading="lazy"
                  />
                  <div className={styles.gridOverlay}>
                    <span className={styles.gridTitle}>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          items={filtered}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
