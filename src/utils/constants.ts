// utils/constants.ts - 圖片問題修復版本
// 使用 Placeholder 服務暫時替代無法載入的 archive.org 圖片

// ═══════════════════════════════════════
// 🎨 塔羅花色相關常數
// ═══════════════════════════════════════

export const SUIT_COLORS = {
  major: '#8b5cf6',
  swords: '#06b6d4',
  cups: '#10b981',
  wands: '#f59e0b',
  pentacles: '#ef4444'
} as const;

export const SUIT_ICONS = {
  major: '🔮',
  swords: '⚔️',
  cups: '🍷',
  wands: '🔥',
  pentacles: '💰'
} as const;

export const SUIT_NAMES_ZH = {
  major: '大牌',
  swords: '寶劍',
  cups: '聖杯',
  wands: '權杖',
  pentacles: '錢幣'
} as const;

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
  INITIAL_DRAWS: 3,
  UNLIMITED_DRAWS: 999,
  CARD_COUNT: 3,
  LOADING_DELAY: 1500,
  STORY_AGE_KEY: 'tarot_remaining_draws',
} as const;





/**
 * 📝 使用說明:
 * 
 * 1. 把這個檔案重新命名為 constants.ts 來覆蓋原檔案
 *    或者直接修改 cardHelpers.ts 的 import 路徑
 * 
 * 2. Placeholder URL 格式說明:
 *    https://via.placeholder.com/寬x高/背景色/文字色?text=顯示文字
 *    
 *    例如:
 *    https://via.placeholder.com/300x450/8b5cf6/FFFFFF?text=The+Fool
 *    ↑ 寬300px  ↑ 高450px  ↑ 紫色背景  ↑ 白色文字  ↑ 顯示 "The Fool"
 * 
 * 3. 顏色碼對應花色:
 *    - 8b5cf6: 紫色 (Major Arcana - 大阿爾克那)
 *    - 06b6d4: 藍色 (Swords - 寶劍)
 *    - 10b981: 綠色 (Cups - 聖杯)
 *    - f59e0b: 橙色 (Wands - 權杖)
 *    - ef4444: 紅色 (Pentacles - 錢幣)
 */

// ============================================================
// 📋 塔羅牌常數設定檔 (使用 Internet Archive 資源)
// ============================================================
// 🎯 作用：定義所有塔羅牌的資料結構、圖片路徑、牌義等
// 📝 這個檔案是整個專案的「資料庫」，所有牌的資訊都在這裡
// ============================================================

// ===== 1️⃣ 圖片來源設定 =====
// 🔸 說明：設定圖片的基礎 URL 和後備方案
// BASE_URL 用於構建資源路徑（考慮到 vite.config.ts 中的 base 設定）
const BASE_URL = import.meta.env.BASE_URL || '/';

export const IMAGE_CONFIG = {
  // 主要來源：Internet Archive (公開資源，無版權問題)
  primarySource: 'https://archive.org/download/rider-waite-tarot',
  
  // 後備方案：Placeholder 圖片服務（當主要圖片載入失敗時使用）
  fallbackSource: 'https://via.placeholder.com/300x500/667eea/ffffff?text=',
  
  // 本地備份路徑（如果你把圖片下載到專案內）
  // 開發模式和生產模式都需要使用 BASE_URL（因為 vite.config.ts 設定了 base）
  // Vite 會自動處理 public 目錄，但需要加上 base 路徑
  localSource: `${BASE_URL}images/tarot`.replace(/\/+/g, '/'),
  
  // 使用哪個來源？ 'archive' | 'local' | 'fallback'
  activeSource: 'local' as 'archive' | 'local' | 'fallback'
}

// ===== 2️⃣ 花色定義 =====
// 🔸 說明：定義塔羅牌的四個花色（小阿爾克那）
export type TarotSuit = 'wands' | 'cups' | 'swords' | 'pentacles'

// 花色的中英文對照
export const SUIT_NAMES: Record<TarotSuit, { en: string; zh: string }> = {
  wands: { en: 'Wands', zh: '權杖' },      // 火元素，代表行動、創造力
  cups: { en: 'Cups', zh: '聖杯' },        // 水元素，代表情感、關係
  swords: { en: 'Swords', zh: '寶劍' },    // 風元素,代表思考、溝通
  pentacles: { en: 'Pentacles', zh: '錢幣' } // 土元素,代表物質、金錢
}

// ===== 3️⃣ 宮廷牌定義 =====
// 🔸 說明：每個花色都有 4 張宮廷牌（人物牌）
export type CourtCard = 'page' | 'knight' | 'queen' | 'king'

export const COURT_NAMES: Record<CourtCard, { en: string; zh: string }> = {
  page: { en: 'Page', zh: '侍者' },     // 學習者、信使
  knight: { en: 'Knight', zh: '騎士' }, // 行動者、冒險家
  queen: { en: 'Queen', zh: '王后' },   // 內在、直覺
  king: { en: 'King', zh: '國王' }      // 外在、掌控
}

// ===== 4️⃣ 塔羅牌資料結構定義 =====
// 🔸 說明：每張塔羅牌都有這些屬性
export interface TarotCard {
  id: string           // 唯一識別碼，例如：'00-fool', 'wands-ace'
  name: string         // 英文名稱
  nameChinese: string  // 中文名稱
  arcana: 'major' | 'minor'  // 大阿爾克那 or 小阿爾克那
  suit?: TarotSuit     // 花色（只有小阿爾克那才有）
  number?: number      // 數字（1-10，或 0-21 for 大阿爾克那）
  court?: CourtCard    // 宮廷牌類型（如果是宮廷牌）
  imageUrl: string     // 圖片 URL
  keywords: string[]   // 關鍵字（用於占卜解讀）
  uprightMeaning: string    // 正位牌義
  reversedMeaning: string   // 逆位牌義
  element?: string     // 元素（火/水/風/土）
  astrology?: string   // 占星對應
}

// ===== 5️⃣ 圖片路徑生成函數 =====
// 🔸 作用：根據牌的 ID 生成正確的圖片 URL
// 🔸 這個函數會自動處理：大阿爾克那、小阿爾克那、宮廷牌的不同命名規則

/**
 * 獲取塔羅牌圖片 URL
 * @param cardId - 牌的唯一 ID（例如：'00-fool', 'wands-ace'）
 * @returns 圖片的完整 URL
 * 
 * @example
 * getTarotImageUrl('00-fool')  // → 'https://archive.org/.../major_arcana_fool.png'
 * getTarotImageUrl('wands-02') // → 'https://archive.org/.../wands_02.png'
 */
export const getTarotImageUrl = (cardId: string): string => {
  const { activeSource, primarySource, localSource, fallbackSource } = IMAGE_CONFIG
  
  // 根據 activeSource 決定基礎路徑
  let basePath = ''
  switch (activeSource) {
    case 'archive':
      basePath = primarySource
      break
    case 'local':
      basePath = localSource
      break
    case 'fallback':
      return `${fallbackSource}${encodeURIComponent(cardId)}`
  }
  
  // 解析 cardId，生成對應的檔案名稱
  const fileName = generateFileName(cardId)
  
  // 確保路徑正確拼接（移除重複的斜線）
  const fullPath = `${basePath}/${fileName}`.replace(/\/+/g, '/')
  
  // 開發模式下輸出調試信息
  if (import.meta.env.DEV) {
    console.log(`[圖片路徑] cardId: ${cardId}, 完整路徑: ${fullPath}`)
  }
  
  return fullPath
}

/**
 * 根據 cardId 生成檔案名稱
 * @param cardId - 牌的 ID
 * @returns 檔案名稱（例如：'major_arcana_fool.png'）
 * 
 * @example
 * generateFileName('00-fool')    // → 'major_arcana_fool.png'
 * generateFileName('wands-ace')  // → 'minor_arcana_wands_ace.png'
 * generateFileName('cups-king')  // → 'minor_arcana_cups_king.png'
 */
const generateFileName = (cardId: string): string => {
  // 🔸 處理大阿爾克那（Major Arcana）
  if (cardId.match(/^\d{2}-/)) {
    // 例如：'00-fool' → 'major_arcana_fool.png'
    let name = cardId.split('-')[1] // 取得 'fool'
    // 特殊處理：'high-priestess' → 'priestess'（檔案名稱不包含 'high-'）
    if (name === 'high-priestess') {
      name = 'priestess'
    }
    return `major_arcana_${name}.png`
  }
  
  // 🔸 處理小阿爾克那（Minor Arcana）
  const [suit, value] = cardId.split('-') // 例如：'wands-ace' → ['wands', 'ace']
  
  // 特殊處理：ace → ace, 數字 → 不補零（實際檔案名稱是 2.png, 7.png, 10.png 等）
  let fileName = ''
  if (value === 'ace') {
    fileName = `minor_arcana_${suit}_ace.png`
  } else if (['page', 'knight', 'queen', 'king'].includes(value)) {
    // 宮廷牌
    fileName = `minor_arcana_${suit}_${value}.png`
  } else {
    // 數字牌（2-10）→ 移除前導零，確保與實際檔案名稱匹配
    // 例如：'07' → '7', '02' → '2', '10' → '10'
    // 實際檔案名稱格式：minor_arcana_swords_2.png, minor_arcana_swords_7.png, minor_arcana_swords_10.png
    const numberValue = parseInt(value, 10).toString() // 移除前導零
    fileName = `minor_arcana_${suit}_${numberValue}.png`
  }
  
  return fileName
}

// ===== 6️⃣ 大阿爾克那資料（Major Arcana - 22張）=====
// 🔸 說明：0-21 號牌，代表人生重大課題、靈性旅程
export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: '00-fool',
    name: 'The Fool',
    nameChinese: '愚者',
    arcana: 'major',
    number: 0,
    imageUrl: getTarotImageUrl('00-fool'),
    keywords: ['開始', '冒險', '純真', '信任'],
    uprightMeaning: '新的開始、冒險精神、保持開放的心態、勇於嘗試未知',
    reversedMeaning: '魯莽行事、缺乏計劃、逃避責任、過度天真',
    element: '風',
    astrology: '天王星'
  },
  {
    id: '01-magician',
    name: 'The Magician',
    nameChinese: '魔術師',
    arcana: 'major',
    number: 1,
    imageUrl: getTarotImageUrl('01-magician'),
    keywords: ['顯化', '技能', '力量', '專注'],
    uprightMeaning: '擁有實現目標的能力和資源、創造力、溝通技巧、自信',
    reversedMeaning: '操縱、欺騙、缺乏方向、未善用天賦',
    element: '風',
    astrology: '水星'
  },
  {
    id: '02-priestess',
    name: 'The High Priestess',
    nameChinese: '女祭司',
    arcana: 'major',
    number: 2,
    imageUrl: getTarotImageUrl('02-priestess'),
    keywords: ['直覺', '神秘', '潛意識', '智慧'],
    uprightMeaning: '傾聽內在聲音、神秘知識、靈性覺醒、等待時機',
    reversedMeaning: '忽視直覺、秘密、表面知識、與內在脫節',
    element: '水',
    astrology: '月亮'
  },
  {
    id: '03-empress',
    name: 'The Empress',
    nameChinese: '皇后',
    arcana: 'major',
    number: 3,
    imageUrl: getTarotImageUrl('03-empress'),
    keywords: ['豐盛', '孕育', '自然', '母性'],
    uprightMeaning: '創造力、豐盛、養育、與自然連結、美好事物',
    reversedMeaning: '過度依賴他人、創意受阻、忽視自我照顧',
    element: '土',
    astrology: '金星'
  },
  {
    id: '04-emperor',
    name: 'The Emperor',
    nameChinese: '皇帝',
    arcana: 'major',
    number: 4,
    imageUrl: getTarotImageUrl('04-emperor'),
    keywords: ['權威', '結構', '掌控', '穩定'],
    uprightMeaning: '建立秩序、領導力、穩定結構、父親形象、責任',
    reversedMeaning: '專制、僵化、失去控制、缺乏紀律',
    element: '火',
    astrology: '白羊座'
  },
  {
    id: '05-hierophant',
    name: 'The Hierophant',
    nameChinese: '教皇',
    arcana: 'major',
    number: 5,
    imageUrl: getTarotImageUrl('05-hierophant'),
    keywords: ['傳統', '教導', '信仰', '傳承'],
    uprightMeaning: '傳統價值、精神導師、教育、遵循規範、尋求指引',
    reversedMeaning: '挑戰傳統、獨立思考、脫離體制、創新',
    element: '土',
    astrology: '金牛座'
  },
  {
    id: '06-lovers',
    name: 'The Lovers',
    nameChinese: '戀人',
    arcana: 'major',
    number: 6,
    imageUrl: getTarotImageUrl('06-lovers'),
    keywords: ['愛', '選擇', '和諧', '結合'],
    uprightMeaning: '愛情、重要選擇、價值觀一致、和諧關係',
    reversedMeaning: '不和諧、選擇困難、價值衝突、失衡',
    element: '風',
    astrology: '雙子座'
  },
  {
    id: '07-chariot',
    name: 'The Chariot',
    nameChinese: '戰車',
    arcana: 'major',
    number: 7,
    imageUrl: getTarotImageUrl('07-chariot'),
    keywords: ['意志', '決心', '勝利', '掌控'],
    uprightMeaning: '克服障礙、意志力、前進、自律、達成目標',
    reversedMeaning: '失去方向、缺乏控制、受阻、自我懷疑',
    element: '水',
    astrology: '巨蟹座'
  },
  {
    id: '08-strength',
    name: 'Strength',
    nameChinese: '力量',
    arcana: 'major',
    number: 8,
    imageUrl: getTarotImageUrl('08-strength'),
    keywords: ['勇氣', '耐心', '溫柔', '內在力量'],
    uprightMeaning: '溫柔的力量、勇氣、耐心、克服恐懼、自我控制',
    reversedMeaning: '自我懷疑、缺乏信心、失去控制、脆弱',
    element: '火',
    astrology: '獅子座'
  },
  {
    id: '09-hermit',
    name: 'The Hermit',
    nameChinese: '隱者',
    arcana: 'major',
    number: 9,
    imageUrl: getTarotImageUrl('09-hermit'),
    keywords: ['內省', '智慧', '孤獨', '指引'],
    uprightMeaning: '內在探索、尋找答案、獨處、靈性成長、智慧',
    reversedMeaning: '孤立、拒絕幫助、迷失、逃避現實',
    element: '土',
    astrology: '處女座'
  },
  {
    id: '10-fortune',
    name: 'Wheel of Fortune',
    nameChinese: '命運之輪',
    arcana: 'major',
    number: 10,
    imageUrl: getTarotImageUrl('10-fortune'),
    keywords: ['命運', '循環', '轉折', '機會'],
    uprightMeaning: '好運、轉機、生命週期、順應變化、業力',
    reversedMeaning: '厄運、抗拒改變、失控、外部力量',
    element: '火',
    astrology: '木星'
  },
  {
    id: '11-justice',
    name: 'Justice',
    nameChinese: '正義',
    arcana: 'major',
    number: 11,
    imageUrl: getTarotImageUrl('11-justice'),
    keywords: ['公平', '真相', '法律', '因果'],
    uprightMeaning: '公正、真相、法律事務、因果報應、做正確的事',
    reversedMeaning: '不公、偏見、逃避責任、失衡',
    element: '風',
    astrology: '天秤座'
  },
  {
    id: '12-hanged',
    name: 'The Hanged Man',
    nameChinese: '倒吊者',
    arcana: 'major',
    number: 12,
    imageUrl: getTarotImageUrl('12-hanged'),
    keywords: ['犧牲', '放手', '新視角', '等待'],
    uprightMeaning: '換個角度、暫停、犧牲、放下執著、等待時機',
    reversedMeaning: '無謂犧牲、拖延、抗拒、錯失機會',
    element: '水',
    astrology: '海王星'
  },
  {
    id: '13-death',
    name: 'Death',
    nameChinese: '死神',
    arcana: 'major',
    number: 13,
    imageUrl: getTarotImageUrl('13-death'),
    keywords: ['轉變', '結束', '重生', '放下'],
    uprightMeaning: '結束與開始、轉變、放下過去、新生、必要的改變',
    reversedMeaning: '抗拒改變、停滯、無法放手、恐懼',
    element: '水',
    astrology: '天蠍座'
  },
  {
    id: '14-temperance',
    name: 'Temperance',
    nameChinese: '節制',
    arcana: 'major',
    number: 14,
    imageUrl: getTarotImageUrl('14-temperance'),
    keywords: ['平衡', '和諧', '耐心', '調和'],
    uprightMeaning: '平衡、調和、耐心、適度、整合',
    reversedMeaning: '失衡、過度、缺乏和諧、不耐煩',
    element: '火',
    astrology: '射手座'
  },
  {
    id: '15-devil',
    name: 'The Devil',
    nameChinese: '惡魔',
    arcana: 'major',
    number: 15,
    imageUrl: getTarotImageUrl('15-devil'),
    keywords: ['束縛', '誘惑', '物質', '陰影'],
    uprightMeaning: '束縛、上癮、物質慾望、陰影面、受困',
    reversedMeaning: '解脫、覺察、打破枷鎖、面對陰影',
    element: '土',
    astrology: '摩羯座'
  },
  {
    id: '16-tower',
    name: 'The Tower',
    nameChinese: '塔',
    arcana: 'major',
    number: 16,
    imageUrl: getTarotImageUrl('16-tower'),
    keywords: ['突變', '崩潰', '啟示', '重建'],
    uprightMeaning: '突然改變、破壞舊有、啟示、必要的崩潰',
    reversedMeaning: '避免災難、逐漸改變、恐懼變化',
    element: '火',
    astrology: '火星'
  },
  {
    id: '17-star',
    name: 'The Star',
    nameChinese: '星星',
    arcana: 'major',
    number: 17,
    imageUrl: getTarotImageUrl('17-star'),
    keywords: ['希望', '療癒', '啟發', '信念'],
    uprightMeaning: '希望、療癒、靈感、信念、平靜',
    reversedMeaning: '失去信心、絕望、缺乏靈感',
    element: '風',
    astrology: '水瓶座'
  },
  {
    id: '18-moon',
    name: 'The Moon',
    nameChinese: '月亮',
    arcana: 'major',
    number: 18,
    imageUrl: getTarotImageUrl('18-moon'),
    keywords: ['幻覺', '潛意識', '恐懼', '直覺'],
    uprightMeaning: '潛意識、幻覺、恐懼、直覺、夢境',
    reversedMeaning: '走出迷霧、釋放恐懼、清晰',
    element: '水',
    astrology: '雙魚座'
  },
  {
    id: '19-sun',
    name: 'The Sun',
    nameChinese: '太陽',
    arcana: 'major',
    number: 19,
    imageUrl: getTarotImageUrl('19-sun'),
    keywords: ['成功', '喜悅', '活力', '真實'],
    uprightMeaning: '成功、喜悅、活力、樂觀、真實自我',
    reversedMeaning: '過度樂觀、延遲成功、缺乏熱情',
    element: '火',
    astrology: '太陽'
  },
  {
    id: '20-judgement',
    name: 'Judgement',
    nameChinese: '審判',
    arcana: 'major',
    number: 20,
    imageUrl: getTarotImageUrl('20-judgement'),
    keywords: ['重生', '覺醒', '呼喚', '評判'],
    uprightMeaning: '重生、覺醒、聽從呼喚、最終判斷、寬恕',
    reversedMeaning: '自我懷疑、拖延、忽視呼喚',
    element: '火',
    astrology: '冥王星'
  },
  {
    id: '21-world',
    name: 'The World',
    nameChinese: '世界',
    arcana: 'major',
    number: 21,
    imageUrl: getTarotImageUrl('21-world'),
    keywords: ['完成', '成就', '圓滿', '整合'],
    uprightMeaning: '完成、成就、圓滿、整合、世界舞台',
    reversedMeaning: '未完成、缺乏閉合、延遲、短視',
    element: '土',
    astrology: '土星'
  }
]

// ===== 7️⃣ 小阿爾克那資料生成函數 =====
// 🔸 說明：因為小阿爾克那有 56 張（4個花色 × 14張），用函數生成比較方便

/**
 * 生成指定花色的所有牌（14張：Ace + 2-10 + 4張宮廷牌）
 * @param suit - 花色
 * @returns 該花色的 14 張牌資料
 */
const generateMinorArcana = (suit: TarotSuit): TarotCard[] => {
  const cards: TarotCard[] = []
  const { en: suitNameEn, zh: suitNameZh } = SUIT_NAMES[suit]
  
  // 1. Ace（王牌）
  cards.push({
    id: `${suit}-ace`,
    name: `Ace of ${suitNameEn}`,
    nameChinese: `${suitNameZh} Ace`,
    arcana: 'minor',
    suit,
    number: 1,
    imageUrl: getTarotImageUrl(`${suit}-ace`),
    keywords: ['開始', '潛力', '機會'],
    uprightMeaning: `新的${suitNameZh}能量開始、潛力、種子`,
    reversedMeaning: `錯失機會、能量受阻、延遲開始`,
    element: getElementBySuit(suit)
  })
  
  // 2. 數字牌 2-10
  for (let num = 2; num <= 10; num++) {
    cards.push({
      id: `${suit}-${num.toString().padStart(2, '0')}`,
      name: `${num} of ${suitNameEn}`,
      nameChinese: `${suitNameZh} ${num}`,
      arcana: 'minor',
      suit,
      number: num,
      imageUrl: getTarotImageUrl(`${suit}-${num.toString().padStart(2, '0')}`),
      keywords: getKeywordsByNumber(num),
      uprightMeaning: `${num} 號牌的正位意義（需補充）`,
      reversedMeaning: `${num} 號牌的逆位意義（需補充）`,
      element: getElementBySuit(suit)
    })
  }
  
  // 3. 宮廷牌（Page, Knight, Queen, King）
  const courts: CourtCard[] = ['page', 'knight', 'queen', 'king']
  courts.forEach(court => {
    const { en: courtNameEn, zh: courtNameZh } = COURT_NAMES[court]
    cards.push({
      id: `${suit}-${court}`,
      name: `${courtNameEn} of ${suitNameEn}`,
      nameChinese: `${suitNameZh}${courtNameZh}`,
      arcana: 'minor',
      suit,
      court,
      imageUrl: getTarotImageUrl(`${suit}-${court}`),
      keywords: getCourtKeywords(court),
      uprightMeaning: `${courtNameZh}的正位意義（需補充）`,
      reversedMeaning: `${courtNameZh}的逆位意義（需補充）`,
      element: getElementBySuit(suit)
    })
  })
  
  return cards
}

// 輔助函數：根據花色取得元素
const getElementBySuit = (suit: TarotSuit): string => {
  const elements: Record<TarotSuit, string> = {
    wands: '火',
    cups: '水',
    swords: '風',
    pentacles: '土'
  }
  return elements[suit]
}

// 輔助函數：根據數字取得關鍵字
const getKeywordsByNumber = (num: number): string[] => {
  const keywords: Record<number, string[]> = {
    2: ['平衡', '選擇', '夥伴'],
    3: ['創造', '成長', '合作'],
    4: ['穩定', '結構', '休息'],
    5: ['衝突', '挑戰', '改變'],
    6: ['和諧', '平衡', '進展'],
    7: ['評估', '選擇', '幻覺'],
    8: ['行動', '快速', '限制'],
    9: ['接近完成', '智慧', '困擾'],
    10: ['完成', '結束', '重擔']
  }
  return keywords[num] || ['待補充']
}

// 輔助函數：根據宮廷牌取得關鍵字
const getCourtKeywords = (court: CourtCard): string[] => {
  const keywords: Record<CourtCard, string[]> = {
    page: ['學習', '訊息', '好奇'],
    knight: ['行動', '追求', '冒險'],
    queen: ['內在', '滋養', '直覺'],
    king: ['掌控', '權威', '成熟']
  }
  return keywords[court]
}

// ===== 8️⃣ 生成所有小阿爾克那（56張）=====
export const MINOR_ARCANA: TarotCard[] = [
  ...generateMinorArcana('wands'),
  ...generateMinorArcana('cups'),
  ...generateMinorArcana('swords'),
  ...generateMinorArcana('pentacles')
]

// ===== 9️⃣ 完整牌組（78張）=====
export const ALL_CARDS: TarotCard[] = [
  ...MAJOR_ARCANA,
  ...MINOR_ARCANA
]

// ===== 🔟 工具函數 =====

/**
 * 根據 ID 查找特定的牌
 * @param cardId - 牌的 ID
 * @returns 找到的牌，或 undefined
 */
export const findCardById = (cardId: string): TarotCard | undefined => {
  return ALL_CARDS.find(card => card.id === cardId)
}

/**
 * 隨機抽取指定數量的牌
 * @param count - 要抽幾張牌
 * @returns 抽到的牌陣列
 */
export const drawRandomCards = (count: number = 1): TarotCard[] => {
  // 複製牌組，避免修改原始資料
  const shuffled = [...ALL_CARDS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

/**
 * 根據花色篩選牌
 * @param suit - 要篩選的花色
 * @returns 該花色的所有牌
 */
export const getCardsBySuit = (suit: TarotSuit): TarotCard[] => {
  return MINOR_ARCANA.filter(card => card.suit === suit)
}

/**
 * 取得所有大阿爾克那
 */
export const getMajorArcana = (): TarotCard[] => {
  return MAJOR_ARCANA
}

/**
 * 取得所有小阿爾克那
 */
export const getMinorArcana = (): TarotCard[] => {
  return MINOR_ARCANA
}

// ===== 📊 匯出摘要資訊 =====
console.log('🎴 塔羅牌資料載入完成！')
console.log(`📋 大阿爾克那: ${MAJOR_ARCANA.length} 張`)
console.log(`📋 小阿爾克那: ${MINOR_ARCANA.length} 張`)
console.log(`📋 總計: ${ALL_CARDS.length} 張`)
