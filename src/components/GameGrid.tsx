"use client";

import React from "react";
import { Game } from "@/types/game";
import { GameCard } from "./GameCard";
import { useStaggeredIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface GameGridProps {
  games: Game[];
}

export const GameGrid: React.FC<GameGridProps> = ({ games }) => {
  const { ref, visibleItems } = useStaggeredIntersectionObserver(games.length, {
    threshold: 0.1,
    staggerDelay: 150,
    triggerOnce: true,
  });

  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎮</div>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          ゲームが見つかりませんでした
        </p>
      </div>
    );
  }

  return (
    <section className="px-4 pb-8 sm:pb-12" aria-label="ゲーム一覧">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          role="grid"
          aria-label={`${games.length}個のゲームが利用可能です`}
        >
          {games.map((game, index) => (
            <div
              key={game.id}
              className={`stagger-item ${visibleItems[index] ? "visible" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>

        {/* ゲーム統計 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {games.length}個のゲームが利用可能です
          </p>
        </div>
      </div>
    </section>
  );
};
