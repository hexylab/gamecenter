import React from 'react';
import { Game } from '@/types/game';
import { GameCard } from './GameCard';

interface GameGridProps {
  games: Game[];
}

export const GameGrid: React.FC<GameGridProps> = ({ games }) => {
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
    <section className="px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
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