import { useState } from 'react';
import { PACKAGES, SERVICE_CATEGORIES } from '../../constants/pricing';
import styles from './Pricing.module.css';

// ── 套餐卡片 ──────────────────────────────────────────
function PackageCard({ pkg }) {
  return (
    <div className={styles.pkgCard}>
      <div className={styles.pkgHeader}>
        {pkg.subtitle && <p className={styles.pkgSubtitle}>{pkg.subtitle}</p>}
        <h3 className={styles.pkgTitle}>{pkg.title}</h3>
      </div>

      {/* 單品清單 */}
      <ul className={styles.pkgItems}>
        {pkg.items.map(item => (
          <li key={item.no} className={styles.pkgItem}>
            <span className={styles.pkgItemNo}>{item.no}.</span>
            <span className={styles.pkgItemName}>{item.name}</span>
            <span className={styles.pkgItemPrice}>
              $ {item.price.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.pkgDivider} />

      {/* 套餐組合 */}
      <div className={styles.combos}>
        {pkg.combos.map(combo => (
          <div key={combo.label} className={styles.combo}>
            <span className={styles.comboLabel}>{combo.label}</span>
            <span className={styles.comboDesc}>{combo.desc}</span>
            <span className={styles.comboPrice}>
              ${combo.price.toLocaleString()}
            </span>
            <span className={styles.comboSave}>
              現省 {combo.save.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* 說明 */}
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
  );
}

// ── 頁面主體 ──────────────────────────────────────────
export default function Pricing() {
  const [activeTab, setActiveTab] = useState('packages');

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
            className={`${styles.tab} ${activeTab === 'packages' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            ⚡ 優惠套餐
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('all')}
          >
            📋 完整項目表
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {/* ── 套餐頁 ── */}
        {activeTab === 'packages' && (
          <div className={styles.container}>
            <p className={styles.sectionNote}>
              以下套餐為組合優惠價，可依需求選擇單品或搭配組合。
            </p>
            <div className={styles.pkgGrid}>
              {PACKAGES.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        )}

        {/* ── 完整項目表頁 ── */}
        {activeTab === 'all' && (
          <div className={styles.container}>
            {/* 快速跳轉 */}
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
