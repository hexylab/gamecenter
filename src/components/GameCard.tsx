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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  const isDisabled = game.status !== 'Available';
  const accessibleDescription = `${game.title}、${game.category}カテゴリ、難易度${game.difficulty}、${game.status === 'Available' ? '利用可能' : game.status === 'Coming Soon' ? '近日公開予定' : 'メンテナンス中'}`;

  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        rounded-xl 
        border border-gray-200 dark:border-gray-700 
        p-4 sm:p-6 
        ${isDisabled 
          ? 'opacity-60 cursor-not-allowed' 
          : 'game-card-hover hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
        }
      `}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={isDisabled ? -1 : 0}
      role="button"
      aria-label={accessibleDescription}
      aria-disabled={isDisabled}
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
        <div className={`inline-block ${!isDisabled ? 'hover:scale-105 active:scale-95' : ''} transition-transform duration-200`}>
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
    </div>
  );
};