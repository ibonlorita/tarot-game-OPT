// pages/TarotGame/TarotGame.tsx

import React from 'react';
import { useTarotGame } from './../hooks/useTarotGame';
import { TarotCard } from './../components/tarot-card';
import { GameHeader } from './../components/game-header';
import { CardInterpretation } from './../components/card-interpretation';
import { LoginModal } from './../components/login-modal';
import { getDatabaseStats } from './../services/tarotDatabase';
import styles from './TarotGame.module.scss';

/**
 * 🎮 塔羅遊戲主頁面
 *
 * 這是整個遊戲的主要頁面元件
 */
const TarotGame: React.FC = () => {
  // 🪝 使用自訂 Hook 取得所有遊戲邏輯
  const {
    gameCards,
    remainingDraws,
    isLoading,
    gameStarted,
    allCardsRevealed,
    showLoginModal,
    handleStartGame,
    handleCardClick,
    handleRestart,
    handleLogin,
    setShowLoginModal,
  } = useTarotGame();

  const dbStats = getDatabaseStats();

  return (
    <div className={styles.container}>
      {/* 🏆 頁面標題 */}
      <GameHeader remainingDraws={remainingDraws} totalCards={dbStats.total} />

      {/* 🎮 遊戲控制區 */}
      {!gameStarted && (
        <section className={styles.controlSection}>
          <button
            onClick={handleStartGame}
            disabled={isLoading}
            className={`${styles.startButton} ${
              isLoading ? styles.loading : ''
            }`}
            aria-busy={isLoading}
          >
            {isLoading ? '🔮 神秘能量匯聚中...' : '✨ 開始神秘占卜'}
          </button>

          <p className={styles.hint}>
            💫 靜心冥想，請先想您想要詢問的問題，讓直覺引導您選擇命運之牌 💫
          </p>
        </section>
      )}

      {/* 🃏 遊戲主區域 */}
      {gameStarted && (
        <>
          <div className={styles.statusText}>
            {allCardsRevealed
              ? '🎉 命運之牌已全部揭曉！'
              : '👆 憑直覺點擊一張牌卡，揭開您的命運指引'}
          </div>

          <div className={styles.cardGrid}>
            {gameCards.map((gameCard) => (
              <TarotCard
                key={gameCard.id}
                gameCard={gameCard}
                onCardClick={handleCardClick}
                disabled={isLoading || gameCard.isFlipped}
              />
            ))}
          </div>

          {allCardsRevealed && (
            <div className={styles.restartSection}>
              <button onClick={handleRestart} className={styles.restartButton}>
                🔄 開啟新的占卜之旅
              </button>
            </div>
          )}

          {allCardsRevealed && (
            <CardInterpretation
              cards={gameCards.filter((c) => c.card !== null)}
            />
          )}
        </>
      )}

      {/* 🔓 登入彈窗 */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* 📖 使用說明 */}
      <section className={styles.instructions}>
        <h3 className={styles.instructionsTitle}>🌟 神秘塔羅占卜指南</h3>
        <ol className={styles.instructionsList}>
          <li>
            <strong>🧘‍♀️ 冥想準備：</strong>
            在開始前，請先靜心片刻，專注於您想要了解的問題
          </li>
          <li>
            <strong>🎲 直覺抽牌：</strong>
            點擊「開始神秘占卜」，系統將為您隨機選取三張命運之牌
          </li>
          <li>
            <strong>💫 揭曉指引：</strong>
            憑直覺點擊任一張牌卡，每張牌都蘊含著獨特的智慧訊息
          </li>
          <li>
            <strong>📚 深度解讀：</strong>
            所有牌卡翻開後，將顯示完整的塔羅解讀內容
          </li>
        </ol>

        <div className={styles.dbInfoBox}>
          <strong>💡 資料庫信息：</strong>
          本系統使用自建的 {dbStats.total} 張經典塔羅牌資料庫，
          包含完整的萊德-韋特塔羅牌組，提供準確的中英文對照和深度解釋。
          所有資料均存儲在本地，確保快速載入和離線可用。
        </div>
      </section>
    </div>
  );
};

export default TarotGame;
