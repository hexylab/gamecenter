import React from "react";
import { GameCategory, GameDifficulty, GameStatus } from "@/types/game";

export interface BadgeProps {
  variant?: "category" | "difficulty" | "status" | "default";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "sm",
  children,
  className = "",
}) => {
  const baseClasses = "inline-flex items-center rounded-full font-medium";

  const variantClasses = {
    category: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    difficulty: getDifficultyClasses(children as string),
    status: getStatusClasses(children as string),
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return <span className={classes}>{children}</span>;
};

function getDifficultyClasses(difficulty: string): string {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "Hard":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
}

function getStatusClasses(status: string): string {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "Coming Soon":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "Maintenance":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
}

// 特定の用途向けのBadgeコンポーネント
export const CategoryBadge: React.FC<{
  category: GameCategory;
  size?: "sm" | "md";
}> = ({ category, size = "sm" }) => (
  <Badge variant="category" size={size}>
    {category}
  </Badge>
);

export const DifficultyBadge: React.FC<{
  difficulty: GameDifficulty;
  size?: "sm" | "md";
}> = ({ difficulty, size = "sm" }) => (
  <Badge variant="difficulty" size={size}>
    {difficulty}
  </Badge>
);

export const StatusBadge: React.FC<{
  status: GameStatus;
  size?: "sm" | "md";
}> = ({ status, size = "sm" }) => (
  <Badge variant="status" size={size}>
    {status}
  </Badge>
);
