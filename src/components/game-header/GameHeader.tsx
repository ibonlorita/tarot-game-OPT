// components/GameHeader/GameHeader.tsx

import React from 'react';
import { formatRemainingDraws } from '../../utils/cardHelpers';
import { getDatabaseStats } from './../../services/tarotDatabase';
import styles from './GameHeader.module.scss';

/**
 * 🎮 遊戲標題元件的 Props
 */
interface GameHeaderProps {
  remainingDraws: number; // 剩餘抽牌次數
  totalCards?: number; // 資料庫總牌數（可選）
}

/**
 * 🏆 遊戲標題元件
 *
 * 職責：
 * - 顯示遊戲標題
 * - 顯示剩餘次數
 * - 顯示資料庫資訊
 */
export const GameHeader: React.FC<GameHeaderProps> = ({ remainingDraws }) => {
  // 取得資料庫統計
  const dbStats = getDatabaseStats();

  return (
    <header className={styles.header}>
      {/* 🎯 主標題 */}
      <div className={styles.titleSection}>
        <h1 className={styles.mainTitle}>🔮 塔羅占卜 🔮</h1>
        <p className={styles.subtitle}>
          探索內心深處的智慧指引 · {dbStats.total} 張經典塔羅牌庫
        </p>
      </div>

      {/* 📊 狀態欄 */}
      <div className={styles.statusBar}>
        <div className={styles.statusContent}>
          {/* 剩餘次數 */}
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>✨ 剩餘免費次數:</span>
            <strong className={styles.statusValue}>
              {formatRemainingDraws(remainingDraws)}
            </strong>
          </div>

          {/* 狀態提示 */}
          {remainingDraws > 900 ? (
            <span className={styles.statusHint}>♾️ 無限次占卜已解鎖</span>
          ) : remainingDraws > 0 ? (
            <span className={`${styles.statusHint} ${styles.positive}`}>
              🌟 享受您的神秘之旅
            </span>
          ) : (
            <span className={`${styles.statusHint} ${styles.warning}`}>
              🔐 需要登入解鎖更多占卜
            </span>
          )}
        </div>

        {/* 資料庫資訊 */}
        <div className={styles.dbInfo}>
          <span className={styles.dbBadge}>📚 本地資料庫</span>
          <span className={styles.dbBadge}>🚀 秒速載入</span>
          <span className={styles.dbBadge}>🌐 離線可用</span>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
