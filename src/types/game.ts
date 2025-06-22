export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji
  category: GameCategory;
  route: string; // /games/[gameId]
  difficulty: GameDifficulty;
  status: GameStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type GameCategory =
  | "Action"
  | "Puzzle"
  | "Strategy"
  | "Arcade"
  | "Casual"
  | "Sport"
  | "Adventure"
  | "Simulation";

export type GameDifficulty = "Easy" | "Medium" | "Hard";

export type GameStatus = "Available" | "Coming Soon" | "Maintenance";

export interface GameFilter {
  category?: GameCategory;
  difficulty?: GameDifficulty;
  status?: GameStatus;
  searchTerm?: string;
}

export interface GameStats {
  totalGames: number;
  availableGames: number;
  comingSoonGames: number;
  gamesByCategory: Record<GameCategory, number>;
  gamesByDifficulty: Record<GameDifficulty, number>;
}
