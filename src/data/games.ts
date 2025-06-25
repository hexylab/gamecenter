import { Game, GameStats } from "@/types/game";

// 実際のゲームデータ（6種類）
export const gameTemplates: Game[] = [
  {
    id: "guess-the-number",
    title: "数当てゲーム",
    description:
      "1から100までの数字を推測するシンプルなゲームです。コンピューターが選んだ数字を最小回数で当てましょう！",
    icon: "🎯",
    category: "Casual",
    route: "/games/guess-the-number",
    difficulty: "Easy",
    status: "Available",
    tags: ["数字", "推理", "初心者向け", "論理"],
    createdAt: "2025-06-22",
    updatedAt: "2025-06-22",
  },
  {
    id: "rock-paper-scissors",
    title: "じゃんけんゲーム",
    description:
      "コンピューターとじゃんけん勝負！連勝記録に挑戦して、じゃんけんマスターを目指しましょう。",
    icon: "✂️",
    category: "Casual",
    route: "/games/rock-paper-scissors",
    difficulty: "Easy",
    status: "Available",
    tags: ["じゃんけん", "対戦", "運", "シンプル"],
    createdAt: "2025-06-22",
    updatedAt: "2025-06-25",
  },
  {
    id: "memory-game",
    title: "記憶ゲーム",
    description:
      "カードの配置を覚えて、同じペアを見つける記憶力ゲームです。集中力と記憶力を鍛えましょう！",
    icon: "🧩",
    category: "Puzzle",
    route: "/games/memory-game",
    difficulty: "Medium",
    status: "Coming Soon",
    tags: ["記憶", "カード", "集中力", "ペア"],
    createdAt: "2025-06-22",
    updatedAt: "2025-06-23",
  },
  {
    id: "typing-game",
    title: "タイピングゲーム",
    description:
      "制限時間内に正確にタイピングしてスコアを競うゲームです。速度と正確性の両方が重要です！",
    icon: "⌨️",
    category: "Arcade",
    route: "/games/typing-game",
    difficulty: "Medium",
    status: "Coming Soon",
    tags: ["タイピング", "速度", "正確性", "スキル"],
    createdAt: "2025-06-22",
    updatedAt: "2025-06-23",
  },
  {
    id: "snake-game",
    title: "スネークゲーム",
    description:
      "古典的なスネークゲーム！食べ物を食べて成長しながら、自分の体にぶつからないよう注意して進みましょう。",
    icon: "🐍",
    category: "Arcade",
    route: "/games/snake-game",
    difficulty: "Hard",
    status: "Coming Soon",
    tags: ["スネーク", "移動", "成長", "古典"],
    createdAt: "2025-06-22",
    updatedAt: "2025-06-22",
  },
  {
    id: "tetris-like",
    title: "テトリス風ゲーム",
    description:
      "落下するブロックを組み合わせてラインを消すパズルゲーム。高得点を目指して戦略的に配置しましょう！",
    icon: "🧱",
    category: "Puzzle",
    route: "/games/tetris-like",
    difficulty: "Hard",
    status: "Coming Soon",
    tags: ["ブロック", "パズル", "戦略", "落下"],
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
