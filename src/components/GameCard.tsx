"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Game } from "@/types/game";
import {
  CategoryBadge,
  DifficultyBadge,
  StatusBadge,
  Button,
} from "@/components/ui";

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (game.status === "Coming Soon") {
      alert("このゲームは近日公開予定です！");
      return;
    }

    if (game.status === "Maintenance") {
      alert("このゲームは現在メンテナンス中です。");
      return;
    }

    // ゲーム詳細ページに遷移
    router.push(game.route);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick();
    }
  };

  const isDisabled = game.status !== "Available";
  const accessibleDescription = `${game.title}、${game.category}カテゴリ、難易度${game.difficulty}、${game.status === "Available" ? "利用可能" : game.status === "Coming Soon" ? "近日公開予定" : "メンテナンス中"}`;

  // 利用可能なゲームの場合
  if (!isDisabled) {
    return (
      <Link href={game.route} className="block">
        <div
          className="
            bg-white dark:bg-gray-800 
            rounded-xl 
            border border-gray-200 dark:border-gray-700 
            p-4 sm:p-6 
            game-card-hover hover:border-blue-300 dark:hover:border-blue-600 
            cursor-pointer active:scale-[0.98] 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
            transition-all duration-200
          "
          aria-describedby={`game-${game.id}-description`}
        >
      {/* ゲームアイコンとタイトル */}
      <div className="text-center mb-3 sm:mb-4">
        <div className="text-3xl sm:text-4xl mb-2 sm:mb-3 hover:animate-[float_2s_ease-in-out_infinite] transition-all duration-300">
          {game.icon}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2 font-[family-name:var(--font-geist-sans)]">
          {game.title}
        </h3>
        <p
          id={`game-${game.id}-description`}
          className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed"
        >
          {game.description}
        </p>
      </div>

      {/* バッジ群 */}
      <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4 justify-center">
        <div className="hover:scale-105 transition-transform duration-200">
          <CategoryBadge category={game.category} />
        </div>
        <div className="hover:scale-105 transition-transform duration-200">
          <DifficultyBadge difficulty={game.difficulty} />
        </div>
        <div className="hover:scale-105 transition-transform duration-200">
          <StatusBadge status={game.status} />
        </div>
      </div>

      {/* タグ */}
      <div className="flex flex-wrap gap-1 mb-4 justify-center">
        {game.tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full 
                       hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 
                       cursor-default hover:scale-105 transform"
          >
            {tag}
          </span>
        ))}
      </div>

          {/* アクションボタン */}
          <div className="text-center">
            <div className="inline-block hover:scale-105 active:scale-95 transition-transform duration-200">
              <Button
                variant="primary"
                size="sm"
              >
                プレイする
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // 利用不可ゲーム（Coming Soon / Maintenance）の場合
  return (
    <div
      className="
        bg-white dark:bg-gray-800 
        rounded-xl 
        border border-gray-200 dark:border-gray-700 
        p-4 sm:p-6 
        opacity-60 cursor-not-allowed
      "
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={accessibleDescription}
      aria-disabled={true}
      aria-describedby={`game-${game.id}-description`}
    >
      {/* ゲームアイコンとタイトル */}
      <div className="text-center mb-3 sm:mb-4">
        <div className="text-3xl sm:text-4xl mb-2 sm:mb-3 transition-all duration-300">
          {game.icon}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2 font-[family-name:var(--font-geist-sans)]">
          {game.title}
        </h3>
        <p
          id={`game-${game.id}-description`}
          className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed"
        >
          {game.description}
        </p>
      </div>

      {/* バッジ群 */}
      <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4 justify-center">
        <div className="transition-transform duration-200">
          <CategoryBadge category={game.category} />
        </div>
        <div className="transition-transform duration-200">
          <DifficultyBadge difficulty={game.difficulty} />
        </div>
        <div className="transition-transform duration-200">
          <StatusBadge status={game.status} />
        </div>
      </div>

      {/* タグ */}
      <div className="flex flex-wrap gap-1 mb-4 justify-center">
        {game.tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full 
                       transition-colors duration-200 cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* アクションボタン */}
      <div className="text-center">
        <div className="inline-block transition-transform duration-200">
          <Button
            variant="outline"
            size="sm"
            disabled={true}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            {game.status === "Coming Soon" && "近日公開"}
            {game.status === "Maintenance" && "メンテナンス中"}
          </Button>
        </div>
      </div>
    </div>
  );
};
