// components/TarotCard/TarotCard.tsx

import React from 'react';
import type { GameCard } from './../../types/tarot';
import { getSuitColor, getSuitIcon } from '../../utils/cardHelpers';
import { SUIT_NAMES_ZH } from '../../utils/constants';
import styles from './TarotCard.module.scss';

/**
 * 🎴 單張塔羅牌元件的 Props
 */
interface TarotCardProps {
  gameCard: GameCard; // 牌卡資料
  onCardClick: (id: number) => void; // 點擊回調
  disabled?: boolean; // 是否禁用點擊
}

/**
 * 🃏 單張塔羅牌元件
 *
 * 職責：
 * - 顯示牌卡正面/背面
 * - 處理點擊互動
 * - 顯示翻牌動畫
 * - 顯示塔羅牌圖片
 */
export const TarotCard: React.FC<TarotCardProps> = ({
  gameCard,
  onCardClick,
  disabled = false,
}) => {
  // 解構取得牌卡資料
  const { id, card, isFlipped, isSelected } = gameCard;

  /**
   * 🎯 處理點擊事件
   */
  const handleClick = () => {
    // 只有在未禁用且未翻開時才能點擊
    if (!disabled && !isFlipped) {
      onCardClick(id);
    }
  };

  /**
   * ⌨️ 處理鍵盤事件（無障礙支援）
   * 讓使用者可以用 Enter 或 Space 鍵來翻牌
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  /**
   * 🖼️ 處理圖片載入錯誤
   */
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const failedUrl = e.currentTarget.src;
    console.error('❌ 圖片載入失敗！');
    console.error('📋 牌卡資訊:', {
      id: card?.id,
      name: card?.chinese_name,
      suit: card?.suit,
      imageUrl: card?.imageUrl,
    });
    console.error('🔗 嘗試載入的路徑:', failedUrl);
    console.error(
      '💡 提示: 請檢查圖片檔案是否存在於 public/images/tarot/ 目錄'
    );

    // 設定預設圖片（placeholder）
    e.currentTarget.src = 'https://via.placeholder.com/200x350?text=Tarot+Card';
  };

  return (
    <div
      className={`
        ${styles.card} 
        ${isSelected ? styles.selected : ''} 
        ${isFlipped ? styles.flipped : ''}
        ${disabled ? styles.disabled : ''}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={isFlipped ? `已翻開：${card?.chinese_name}` : '點擊翻牌'}
      aria-disabled={disabled}
    >
      {isFlipped && card ? (
        // 🎴 牌卡正面
        <div className={styles.cardFront}>
          {/* 花色標籤 */}
          <span
            className={styles.suitBadge}
            style={{ backgroundColor: getSuitColor(card.suit) }}
          >
            {getSuitIcon(card.suit)} {SUIT_NAMES_ZH[card.suit]}
          </span>

          {/* 🖼️ 塔羅牌圖片 */}
          {card.imageUrl && (
            <div className={styles.cardImageContainer}>
              <img
                src={card.imageUrl}
                alt={`${card.chinese_name} - ${card.name}`}
                className={styles.cardImage}
                onError={handleImageError}
                loading="lazy"
              />
            </div>
          )}

          {/* 如果沒有圖片，顯示水晶球 emoji */}
          {!card.imageUrl && <div className={styles.cardIcon}>🔮</div>}

          {/* 牌名 */}
          <h3 className={styles.cardTitle}>{card.chinese_name}</h3>

          <p className={styles.cardSubtitle}>{card.name}</p>

          {/* 關鍵字標籤 */}
          <div className={styles.keywords}>
            {card.keywords.slice(0, 3).map((keyword, index) => (
              <span
                key={index}
                className={styles.keywordTag}
                style={{
                  backgroundColor: `${getSuitColor(card.suit)}20`,
                  color: getSuitColor(card.suit),
                }}
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* 正位意義 */}
          <div className={styles.meaning}>
            <div
              className={styles.meaningTitle}
              style={{ color: getSuitColor(card.suit) }}
            >
              🌟 正位指引
            </div>
            <p className={styles.meaningText}>{card.meaning_up}</p>
          </div>
        </div>
      ) : (
        // 🔒 牌卡背面
        <div className={styles.cardBack}>
          {/* 神秘光暈效果背景 */}
          <div className={styles.backGlow} />

          <div className={styles.backContent}>
            <div className={styles.backIcon}>🌟</div>

            <div className={styles.backTitle}>命運之牌</div>

            <div className={styles.backSubtitle}>
              點擊揭曉
              <br />
              您的神秘指引
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TarotCard;
