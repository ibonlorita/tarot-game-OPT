// utils/genericHelpers.ts

/**
 * 泛型工具函數示例
 * 展示在塔羅牌項目中如何使用泛型
 */

// 1. 通用的數組操作函數
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 2. 通用的隨機選擇函數
export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
}

// 3. 通用的緩存類
export class Cache<K, V> {
  private cache = new Map<K, V>();
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  set(key: K, value: V): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  get(key: K): V | undefined {
    return this.cache.get(key);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

// 4. 通用的狀態管理器
export class StateManager<T> {
  private state: T;
  private listeners: Array<(state: T) => void> = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(newState: T | ((prevState: T) => T)): void {
    this.state = typeof newState === 'function' 
      ? (newState as (prevState: T) => T)(this.state)
      : newState;
    
    this.listeners.forEach(listener => listener(this.state));
  }

  subscribe(listener: (state: T) => void): () => void {
    this.listeners.push(listener);
    
    // 返回取消訂閱函數
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
}

// 5. 通用的 API 響應類型
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

// 6. 通用的結果類型（處理成功/失敗情況）
export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

// 7. 通用的異步操作包裝器
export async function withErrorHandling<T>(
  operation: () => Promise<T>
): Promise<Result<T>> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

// 8. 通用的深拷貝函數
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }

  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  return obj;
}

// 使用示例：
/*
import { TarotCard, GameCard } from '../types/tarot';

// 1. 洗牌塔羅牌
const shuffledCards = shuffleArray<TarotCard>(allCards);

// 2. 隨機抽取3張牌
const drawnCards = getRandomItems<TarotCard>(allCards, 3);

// 3. 創建塔羅牌緩存
const cardCache = new Cache<number, TarotCard>();
cardCache.set(1, someCard);

// 4. 遊戲狀態管理
const gameStateManager = new StateManager<GameState>(initialGameState);

// 5. API 調用錯誤處理
const result = await withErrorHandling(() => tarotApi.getAllCards());
if (result.success) {
  console.log('獲取卡牌成功:', result.data);
} else {
  console.error('獲取卡牌失敗:', result.error);
}
*/

