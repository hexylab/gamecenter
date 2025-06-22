import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-[family-name:var(--font-geist-sans)]">
          <span className="inline-block mr-3">🎮</span>
          Hexyl&apos;s Game Center
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-[family-name:var(--font-geist-sans)]">
          様々なゲームを楽しもう！
        </p>
      </div>
    </header>
  );
};