"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {},
) => {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);

        if (isVisible && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, hasIntersected]);

  // triggerOnce が true の場合、一度表示されたら true を維持
  const shouldShow = triggerOnce ? hasIntersected : isIntersecting;

  return { ref: targetRef, isVisible: shouldShow };
};

// 複数の要素に段階的なアニメーションを適用するためのフック
export const useStaggeredIntersectionObserver = (
  count: number,
  options: UseIntersectionObserverOptions & { staggerDelay?: number } = {},
) => {
  const { staggerDelay = 100, ...intersectionOptions } = options;
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(count).fill(false),
  );
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // コンテナが表示されたら、段階的にアイテムを表示
        for (let i = 0; i < count; i++) {
          setTimeout(() => {
            setVisibleItems((prev) => {
              const newItems = [...prev];
              newItems[i] = true;
              return newItems;
            });
          }, i * staggerDelay);
        }
      }
    }, intersectionOptions);

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [count, staggerDelay, intersectionOptions]);

  return { ref: containerRef, visibleItems };
};
