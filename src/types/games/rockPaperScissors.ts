export type Hand = "rock" | "paper" | "scissors";

export type GameResult = "win" | "lose" | "draw";

export type GamePhase =
  | "waiting" // ゲーム開始前
  | "selecting" // 手を選択中
  | "revealing" // 結果表示中
  | "result" // 結果確認中
  | "continuing"; // 連勝継続判断中

export interface RockPaperScissorsState {
  playerHand: Hand | null;
  cpuHand: Hand | null;
  gamePhase: GamePhase;
  gameResult: GameResult | null;
  currentWinStreak: number;
  gameStartTime: number;
  roundCount: number;
}

export interface RoundResult {
  playerHand: Hand;
  cpuHand: Hand;
  result: GameResult;
  roundNumber: number;
  timestamp: number;
}

export interface RockPaperScissorsStats {
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  maxWinStreak: number;
  totalRounds: number;
  handFrequency: {
    rock: number;
    paper: number;
    scissors: number;
  };
  averageWinStreak: number;
}

export interface CPUStrategy {
  name: "random" | "adaptive";
  getNextHand: (playerHistory: Hand[]) => Hand;
}

export interface GameSettings {
  enableAnimation: boolean;
  animationSpeed: "slow" | "normal" | "fast";
  enableSound: boolean;
  cpuStrategy: CPUStrategy["name"];
}

export const DEFAULT_SETTINGS: GameSettings = {
  enableAnimation: true,
  animationSpeed: "normal",
  enableSound: true,
  cpuStrategy: "random",
};

export const HAND_DISPLAY: Record<Hand, { emoji: string; name: string }> = {
  rock: { emoji: "✊", name: "グー" },
  paper: { emoji: "✋", name: "パー" },
  scissors: { emoji: "✌️", name: "チョキ" },
};

export const RESULT_MESSAGES: Record<GameResult, string> = {
  win: "勝利！",
  lose: "敗北...",
  draw: "引き分け",
};
