import { Game, GameStats } from "@/types/game";

// GameTemplateのモックデータ
export const gameTemplates: Game[] = [
  {
    id: "game-template-1",
    title: "ゲームテンプレート 1",
    description: "カジュアルゲームのテンプレートです。簡単で誰でも楽しめます。",
    icon: "🎮",
    category: "Casual",
    route: "/games/game-template-1",
    difficulty: "Easy",
    status: "Available",
    tags: ["テンプレート", "カジュアル", "初心者向け"],
    createdAt: "2025-06-22",
    updatedAt: "2025-06-22",
  },
  {
    id: "game-template-2",
    title: "ゲームテンプレート 2",
    description: "パズルゲームのテンプレートです。頭を使って楽しめます。",
    icon: "🧩",
    category: "Puzzle",
    route: "/games/game-template-2",
    difficulty: "Medium",
    status: "Available",
    tags: ["テンプレート", "パズル", "思考力"],
    createdAt: "2025-06-22",
    updatedAt: "2025-06-22",
  },
  {
    id: "game-template-3",
    title: "ゲームテンプレート 3",
    description: "アクションゲームのテンプレートです。スリルを味わえます。",
    icon: "⚡",
    category: "Action",
    route: "/games/game-template-3",
    difficulty: "Hard",
    status: "Coming Soon",
    tags: ["テンプレート", "アクション", "上級者向け"],
    createdAt: "2025-06-22",
    updatedAt: "2025-06-22",
  },
  {
    id: "game-template-4",
    title: "ゲームテンプレート 4",
    description: "アーケードゲームのテンプレートです。懐かしさを感じられます。",
    icon: "🕹️",
    category: "Arcade",
    route: "/games/game-template-4",
    difficulty: "Medium",
    status: "Available",
    tags: ["テンプレート", "アーケード", "レトロ"],
    createdAt: "2025-06-22",
    updatedAt: "2025-06-22",
  },
  {
    id: "game-template-5",
    title: "ゲームテンプレート 5",
    description:
      "戦略ゲームのテンプレートです。じっくり考えて戦略を練りましょう。",
    icon: "🎯",
    category: "Strategy",
    route: "/games/game-template-5",
    difficulty: "Hard",
    status: "Available",
    tags: ["テンプレート", "戦略", "戦術"],
    createdAt: "2025-06-22",
    updatedAt: "2025-06-22",
  },
  {
    id: "game-template-6",
    title: "ゲームテンプレート 6",
    description:
      "スポーツゲームのテンプレートです。体を動かした気分になれます。",
    icon: "⚽",
    category: "Sport",
    route: "/games/game-template-6",
    difficulty: "Easy",
    status: "Coming Soon",
    tags: ["テンプレート", "スポーツ", "運動"],
    createdAt: "2025-06-22",
    updatedAt: "2025-06-22",
  },
];

// ゲーム関連のユーティリティ関数
export const getGameById = (id: string): Game | undefined => {
  return gameTemplates.find((game) => game.id === id);
};

export const getAvailableGames = (): Game[] => {
  return gameTemplates.filter((game) => game.status === "Available");
};

export const getGamesByCategory = (category: string): Game[] => {
  return gameTemplates.filter((game) => game.category === category);
};

export const getGamesByDifficulty = (difficulty: string): Game[] => {
  return gameTemplates.filter((game) => game.difficulty === difficulty);
};

export const searchGames = (searchTerm: string): Game[] => {
  const term = searchTerm.toLowerCase();
  return gameTemplates.filter(
    (game) =>
      game.title.toLowerCase().includes(term) ||
      game.description.toLowerCase().includes(term) ||
      game.tags.some((tag) => tag.toLowerCase().includes(term)),
  );
};

// ゲーム統計情報
export const getGameStats = (): GameStats => {
  const totalGames = gameTemplates.length;
  const availableGames = gameTemplates.filter(
    (game) => game.status === "Available",
  ).length;
  const comingSoonGames = gameTemplates.filter(
    (game) => game.status === "Coming Soon",
  ).length;

  const gamesByCategory = gameTemplates.reduce(
    (acc, game) => {
      acc[game.category] = (acc[game.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const gamesByDifficulty = gameTemplates.reduce(
    (acc, game) => {
      acc[game.difficulty] = (acc[game.difficulty] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    totalGames,
    availableGames,
    comingSoonGames,
    gamesByCategory: gamesByCategory as Record<string, number>,
    gamesByDifficulty: gamesByDifficulty as Record<string, number>,
  };
};
