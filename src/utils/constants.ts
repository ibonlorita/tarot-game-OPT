// utils/constants.ts - 更新版

// ═══════════════════════════════════════
// 🎨 塔羅花色相關常數
// ═══════════════════════════════════════

/**
 * 塔羅花色顏色映射
 * 每個花色都有對應的主題色
 */
export const SUIT_COLORS = {
  major: '#8b5cf6',      // 紫色 - 神秘、靈性
  swords: '#06b6d4',     // 藍色 - 理智、真相
  cups: '#10b981',       // 綠色 - 情感、愛
  wands: '#f59e0b',      // 橙色 - 熱情、行動
  pentacles: '#ef4444'   // 紅色 - 物質、財富
} as const;

/**
 * 塔羅花色圖標
 */
export const SUIT_ICONS = {
  major: '🔮',   // 水晶球
  swords: '⚔️',  // 寶劍
  cups: '🍷',    // 聖杯
  wands: '🔥',   // 火焰
  pentacles: '💰' // 錢幣
} as const;

/**
 * 塔羅花色中文名稱
 */
export const SUIT_NAMES_ZH = {
  major: '大牌',
  swords: '寶劍',
  cups: '聖杯',
  wands: '權杖',
  pentacles: '錢幣'
} as const;

/**
 * 🎴 卡牌背面花色圖案配置
 * 用於卡牌背面的視覺設計
 */
export const SUIT_BACK_DESIGNS = {
  major: {
    icon: '🔮',
    primaryIcon: '✨',
    secondaryIcon: '🌟',
    title: '神秘大牌',
    subtitle: '揭開命運之謎'
  },
  swords: {
    icon: '⚔️',
    primaryIcon: '⚔️',
    secondaryIcon: '☁️',
    title: '寶劍之刃',
    subtitle: '真相與智慧'
  },
  cups: {
    icon: '🍷',
    primaryIcon: '💧',
    secondaryIcon: '🌊',
    title: '聖杯之愛',
    subtitle: '情感與直覺'
  },
  wands: {
    icon: '🔥',
    primaryIcon: '🔥',
    secondaryIcon: '⚡',
    title: '權杖之火',
    subtitle: '熱情與行動'
  },
  pentacles: {
    icon: '💰',
    primaryIcon: '⭐',
    secondaryIcon: '💎',
    title: '錢幣之富',
    subtitle: '豐盛與實現'
  }
} as const;

// ═══════════════════════════════════════
// 🎮 遊戲配置常數
// ═══════════════════════════════════════

export const GAME_CONFIG = {
  INITIAL_DRAWS: 3,              // 初始免費抽卡次數
  UNLIMITED_DRAWS: 999,          // 登入後的抽卡次數
  CARD_COUNT: 3,                 // 每局抽牌數量
  LOADING_DELAY: 1500,           // 抽牌動畫延遲（毫秒）
  STORY_AGE_KEY: 'tarot_remaining_draws', // localStorage 鍵名
} as const;

// ═══════════════════════════════════════
// 🖼️ 圖片資源配置
// ═══════════════════════════════════════

/**
 * Rider-Waite 塔羅牌圖片基礎 URL
 * 使用 Internet Archive 的免費資源（CC0 授權）
 */
export const TAROT_IMAGE_BASE_URL = 'https://archive.org/download/rider-waite-tarot/RiderWaiteCards/';

/**
 * 📸 牌卡檔名映射（對應 Internet Archive 的檔名）
 * 
 * 結構：
 * - Key: 牌卡 ID (0-77)
 * - Value: 圖片檔名
 */
export const CARD_IMAGE_FILENAMES: Record<number, string> = {
  // ═══════════════════════════════════════
  // 大阿爾克那 (Major Arcana) 0-21
  // ═══════════════════════════════════════
  0: '00-fool.jpg',
  1: '01-magician.jpg',
  2: '02-high-priestess.jpg',
  3: '03-empress.jpg',
  4: '04-emperor.jpg',
  5: '05-hierophant.jpg',
  6: '06-lovers.jpg',
  7: '07-chariot.jpg',
  8: '08-strength.jpg',
  9: '09-hermit.jpg',
  10: '10-wheel-of-fortune.jpg',
  11: '11-justice.jpg',
  12: '12-hanged-man.jpg',
  13: '13-death.jpg',
  14: '14-temperance.jpg',
  15: '15-devil.jpg',
  16: '16-tower.jpg',
  17: '17-star.jpg',
  18: '18-moon.jpg',
  19: '19-sun.jpg',
  20: '20-judgement.jpg',
  21: '21-world.jpg',

  // ═══════════════════════════════════════
  // 寶劍組 (Swords) 22-35
  // ═══════════════════════════════════════
  22: 'swords-ace.jpg',
  23: 'swords-02.jpg',
  24: 'swords-03.jpg',
  25: 'swords-04.jpg',
  26: 'swords-05.jpg',
  27: 'swords-06.jpg',
  28: 'swords-07.jpg',
  29: 'swords-08.jpg',
  30: 'swords-09.jpg',
  31: 'swords-10.jpg',
  32: 'swords-page.jpg',
  33: 'swords-knight.jpg',
  34: 'swords-queen.jpg',
  35: 'swords-king.jpg',

  // ═══════════════════════════════════════
  // 聖杯組 (Cups) 36-49
  // ═══════════════════════════════════════
  36: 'cups-ace.jpg',
  37: 'cups-02.jpg',
  38: 'cups-03.jpg',
  39: 'cups-04.jpg',
  40: 'cups-05.jpg',
  41: 'cups-06.jpg',
  42: 'cups-07.jpg',
  43: 'cups-08.jpg',
  44: 'cups-09.jpg',
  45: 'cups-10.jpg',
  46: 'cups-page.jpg',
  47: 'cups-knight.jpg',
  48: 'cups-queen.jpg',
  49: 'cups-king.jpg',

  // ═══════════════════════════════════════
  // 權杖組 (Wands) 50-63
  // ═══════════════════════════════════════
  50: 'wands-ace.jpg',
  51: 'wands-02.jpg',
  52: 'wands-03.jpg',
  53: 'wands-04.jpg',
  54: 'wands-05.jpg',
  55: 'wands-06.jpg',
  56: 'wands-07.jpg',
  57: 'wands-08.jpg',
  58: 'wands-09.jpg',
  59: 'wands-10.jpg',
  60: 'wands-page.jpg',
  61: 'wands-knight.jpg',
  62: 'wands-queen.jpg',
  63: 'wands-king.jpg',

  // ═══════════════════════════════════════
  // 錢幣組 (Pentacles) 64-77
  // ═══════════════════════════════════════
  64: 'pentacles-ace.jpg',
  65: 'pentacles-02.jpg',
  66: 'pentacles-03.jpg',
  67: 'pentacles-04.jpg',
  68: 'pentacles-05.jpg',
  69: 'pentacles-06.jpg',
  70: 'pentacles-07.jpg',
  71: 'pentacles-08.jpg',
  72: 'pentacles-09.jpg',
  73: 'pentacles-10.jpg',
  74: 'pentacles-page.jpg',
  75: 'pentacles-knight.jpg',
  76: 'pentacles-queen.jpg',
  77: 'pentacles-king.jpg'
};