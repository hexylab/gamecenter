export interface GuessTheNumberState {
  targetNumber: number;
  currentGuess: string;
  attempts: number;
  guessHistory: GuessResult[];
  gameStatus: GameStatus;
  startTime: number;
  endTime?: number;
  bestScore?: number;
}

export interface GuessResult {
  guess: number;
  result: 'too-high' | 'too-low' | 'correct';
  attemptNumber: number;
  timestamp: number;
}

export type GameStatus = 
  | 'waiting' // ゲーム開始前
  | 'playing' // プレイ中
  | 'won'     // 正解
  | 'paused'; // 一時停止

export interface GuessTheNumberStats {
  totalGames: number;
  gamesWon: number;
  totalAttempts: number;
  bestScore: number; // 最少試行回数
  averageAttempts: number;
  fastestTime: number; // 最短時間（秒）
  winRate: number; // 勝率（%）
}

export interface GameSettings {
  minNumber: number;
  maxNumber: number;
  enableTimer: boolean;
  enableSound: boolean;
  enableHints: boolean;
}

export const DEFAULT_SETTINGS: GameSettings = {
  minNumber: 1,
  maxNumber: 100,
  enableTimer: true,
  enableSound: true,
  enableHints: true,
};