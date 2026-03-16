/**
 * 相簿資料
 *
 * 使用方式：將 Cloudinary 圖片 URL 填入 image 欄位
 * Cloudinary 建議 URL 格式（自動 WebP + 壓縮）：
 *   https://res.cloudinary.com/<your-cloud>/image/upload/f_auto,q_auto,w_1200/tmoc/gallery/<filename>
 *
 * tags 可多選，用於篩選功能：
 *   'bumper' | 'chassis' | 'exterior' | 'power' | 'camping' | 'bed' | 'electric' | 'full'
 */
export const GALLERY_ITEMS = [
  // 範例格式（填入真實 Cloudinary URL 後取消註解）：
  // {
  //   id: 'car-001-1',
  //   title: '車主 A 改裝實例',
  //   tags: ['bumper', 'exterior'],
  //   image: 'https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_1200/tmoc/gallery/car-001-1.webp',
  //   thumb: 'https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_400/tmoc/gallery/car-001-1.webp',
  // },
];

export const GALLERY_TAGS = [
  { id: 'all',      label: '全部' },
  { id: 'bumper',   label: '防撞桿／重力盤' },
  { id: 'chassis',  label: '底盤' },
  { id: 'exterior', label: '外觀' },
  { id: 'power',    label: '動力' },
  { id: 'camping',  label: '露營' },
  { id: 'bed',      label: '床椅' },
  { id: 'electric', label: '電系' },
  { id: 'full',     label: '全車改裝' },
];
