// utils/cardHelpers.ts

import type { TarotCard, TarotSuit } from './../types/tarot';
import { getTarotImageUrl, SUIT_COLORS, SUIT_ICONS } from './constants';


// 根據花色取得對應顏色
/**
 * @param suit - 塔羅花色
 * @returns 對應的顏色
 */
export const getSuitColor = (suit: TarotSuit): string => {
  return SUIT_COLORS[suit] || '#6b7280';
}

// 根據花色取得對應圖標
/**
 * @param suit - 塔羅花色
 * @returns 對應的圖標
 */
export const getSuitIcon = (suit: TarotSuit): string => {
  return SUIT_ICONS[suit] || '🔮';
}

// 洗牌算法 使用 Fisher-Yates 洗牌算法
/*
 *
 * 這是最標準的洗牌算法，確保每種排列的機率相等
 * 時間複雜度：O(n)
 * 空間複雜度：O(n) - 因為複製了一份陣列
 *
 * @param array - 要洗牌的陣列
 * @returns 洗好的新陣列（不修改原陣列）
 *
 * @example
 * const cards = [1, 2, 3, 4, 5];
 * const shuffled = shuffleArray(cards);
 * console.log(shuffled); // [3, 1, 5, 2, 4]（隨機結果）
*/
export function shuffleArray<T>(array: T[]): T[] {

  const shuffled = [ ...array ];


  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // 使用解構賦值交換兩個元素的位置
    // ES6 語法糖，等同於
    // const temp = shuffled[i];
    // shuffled[i] = shuffled[j];
    // shuffled[j] = temp;
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

// 格式化剩餘次數顯示
/*
* @param draws - 剩餘次數
* @returns 格式化後的字串
*
*/
export const formatRemainingDraws = (remaining: number): string => {
  if (remaining > 900) return '無限';
  if (remaining <= 0) return '0';
  return remaining.toString();
}


// 檢查是否所有牌都已翻開
/**
 * @param cards - 牌卡陣列
 * @returns 是否所有牌都已翻開 boolean
 *
 */
export const areAllCardsRevealed = (cards: Array<{ isFlipped: boolean }>): boolean => {

  // 只要有一個false就返回false (every 檢查陣列中所有元素是否都滿足條件)
  return cards.every(card => card.isFlipped);
}


/**
 * 將數字 ID 轉換為 cardId 字串格式
 * @param id - 牌的數字 ID (0-77)
 * @returns cardId 字串格式
 */
const convertIdToCardId = (id: number): string => {
  // 大阿爾克那 (0-21)
  if (id <= 21) {
    const majorNames = [
      'fool', 'magician', 'priestess', 'empress', 'emperor',
      'hierophant', 'lovers', 'chariot', 'strength', 'hermit',
      'fortune', 'justice', 'hanged', 'death', 'temperance',
      'devil', 'tower', 'star', 'moon', 'sun',
      'judgement', 'world'
    ];
    return `${id.toString().padStart(2, '0')}-${majorNames[id]}`;
  }
  
  // 小阿爾克那
  // 寶劍組 (22-35)
  if (id >= 22 && id <= 35) {
    const index = id - 22;
    return getMinorCardId('swords', index);
  }
  // 聖杯組 (36-49)
  if (id >= 36 && id <= 49) {
    const index = id - 36;
    return getMinorCardId('cups', index);
  }
  // 權杖組 (50-63)
  if (id >= 50 && id <= 63) {
    const index = id - 50;
    return getMinorCardId('wands', index);
  }
  // 錢幣組 (64-77)
  if (id >= 64 && id <= 77) {
    const index = id - 64;
    return getMinorCardId('pentacles', index);
  }
  
  throw new Error(`無效的牌卡 ID: ${id}`);
};

/**
 * 生成小阿爾克那的 cardId
 * @param suit - 花色
 * @param index - 在該花色中的索引 (0-13)
 * @returns cardId 字串
 */
const getMinorCardId = (suit: string, index: number): string => {
  // 0: ace, 1-9: 2-10, 10-13: page, knight, queen, king
  if (index === 0) {
    return `${suit}-ace`;
  } else if (index >= 1 && index <= 9) {
    // 不補零，直接使用數字（實際檔案名稱是 2.png, 7.png, 10.png 等）
    return `${suit}-${index + 1}`;
  } else {
    const courtCards = ['page', 'knight', 'queen', 'king'];
    return `${suit}-${courtCards[index - 10]}`;
  }
};

/**
 * 取得塔羅圖片的完整 URL
 * 
 * @param cardId - 牌卡ID（可以是數字 0-77 或字串格式：'00-fool', '01-magician', 'wands-ace', 'cups-02' 等）
 * @returns 塔羅圖片URL
 * 
 * @example
 * const imageUrl = getCardImageUrl('00-fool');
 * console.log(imageUrl); // '/images/tarot/major_arcana_fool.png'
 * 
 * @example
 * const imageUrl = getCardImageUrl('wands-ace');
 * console.log(imageUrl); // '/images/tarot/minor_arcana_wands_ace.png'
 * 
 * @example
 * const imageUrl = getCardImageUrl(0);
 * console.log(imageUrl); // '/images/tarot/major_arcana_fool.png'
 */
export const getCardImageUrl = (cardId: string | number): string => {
  try {
    // 如果是數字，先轉換為 cardId 字串格式
    const cardIdString = typeof cardId === 'number' 
      ? convertIdToCardId(cardId)
      : cardId;
    
    // 調用新版的 getTarotImageUrl 函數（來自 constants.ts）
    const imageUrl = getTarotImageUrl(cardIdString);
    
    // 開發模式下輸出詳細調試信息
    if (import.meta.env.DEV) {
      console.log(`[getCardImageUrl] 輸入: ${cardId} (${typeof cardId}), cardId: ${cardIdString}, 圖片路徑: ${imageUrl}`);
    }
    
    return imageUrl;
  } catch (error) {
    // 如果發生錯誤，使用預設圖片
    console.error(`❌ 找不到 ID ${cardId} 的圖片，發生錯誤:`, error);
    return '/images/card-back.png';  // ← 預設的卡牌背面圖
  }
};

// 根據 ID 尋找牌卡
/*
 * @parm cards - 牌卡陣列
 * @parm id - 牌卡ID
 * @returns 找到的牌卡 或 undefined
*/
export const findCardById = (cards: TarotCard[], id: number): TarotCard | undefined => {
  return cards.find(card => card.id === id)
}

// 根據花色取得漸層背景
/*
 * @param suit - 塔羅花色
 * @returns CSS 漸層字串 
*/
export const getSuitGradient = (suit: TarotSuit): string => {
  const color = getSuitColor(suit);
  return `linear-gradient(145deg, ${color}20 0%, ${color}05 100%)`;
}

