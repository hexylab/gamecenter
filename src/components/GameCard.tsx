'use client';

import React from 'react';
import { Game } from '@/types/game';
import { CategoryBadge, DifficultyBadge, StatusBadge, Button } from '@/components/ui';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const handleCardClick = () => {
    if (game.status === 'Coming Soon') {
      alert('このゲームは近日公開予定です！');
      return;
    }
    
    if (game.status === 'Maintenance') {
      alert('このゲームは現在メンテナンス中です。');
      return;
    }
    
    // Phase 4で実装予定: 実際のゲームページへの遷移
    alert(`「${game.title}」は準備中です。実装をお待ちください！`);
  };

  const isDisabled = game.status !== 'Available';

  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        rounded-xl 
        border border-gray-200 dark:border-gray-700 
        p-6 
        transition-all duration-300 
        ${isDisabled 
          ? 'opacity-60 cursor-not-allowed' 
          : 'hover:shadow-lg hover:scale-[1.02] hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer'
        }
      `}
      onClick={handleCardClick}
    >
      {/* ゲームアイコンとタイトル */}
      <div className="text-center mb-4">
        <div className="text-4xl mb-3">
          {game.icon}
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2 font-[family-name:var(--font-geist-sans)]">
          {game.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {game.description}
        </p>
      </div>

      {/* バッジ群 */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        <CategoryBadge category={game.category} />
        <DifficultyBadge difficulty={game.difficulty} />
        <StatusBadge status={game.status} />
      </div>

      {/* タグ */}
      <div className="flex flex-wrap gap-1 mb-4 justify-center">
        {game.tags.map((tag, index) => (
          <span 
            key={index}
            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* アクションボタン */}
      <div className="text-center">
        <Button
          variant={isDisabled ? 'outline' : 'primary'}
          size="sm"
          disabled={isDisabled}
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          {game.status === 'Available' && 'プレイする'}
          {game.status === 'Coming Soon' && '近日公開'}
          {game.status === 'Maintenance' && 'メンテナンス中'}
        </Button>
      </div>
    </div>
  );
};