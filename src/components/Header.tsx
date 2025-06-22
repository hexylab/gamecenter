'use client';

import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export const Header: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <header 
      className="text-center py-8 sm:py-12 px-4"
      role="banner"
    >
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-4xl mx-auto animate-on-scroll ${isVisible ? 'visible' : ''}`}
      >
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 font-[family-name:var(--font-geist-sans)]"
          id="main-title"
        >
          <span 
            className="inline-block mr-2 sm:mr-3 hover:animate-[float_2s_ease-in-out_infinite]"
            role="img"
            aria-label="ゲームコントローラーアイコン"
          >
            🎮
          </span>
          Hexyl&apos;s Game Center
        </h1>
        <p 
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 font-[family-name:var(--font-geist-sans)]"
          role="doc-subtitle"
          aria-describedby="main-title"
        >
          様々なゲームを楽しもう！
        </p>
      </div>
    </header>
  );
};