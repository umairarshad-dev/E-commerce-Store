'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StickyMobileBarProps {
  price: number;
  isReady: boolean;
  onAddToCart: () => void;
  /** Ref to the main "Add to Cart" button — bar shows when it scrolls out of view */
  mainButtonRef: React.RefObject<HTMLElement | null>;
}

export default function StickyMobileBar({ price, isReady, onAddToCart, mainButtonRef }: StickyMobileBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = mainButtonRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mainButtonRef]);

  if (!visible) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] flex items-center gap-3"
      role="region"
      aria-label="Quick add to cart"
    >
      <div className="flex flex-col">
        <span className="text-[10px] text-[var(--muted)] font-medium">Price</span>
        <span className="text-base font-bold text-[var(--accent)] tabular-nums">
          Rs {price.toLocaleString('en-PK')}
        </span>
      </div>
      <button
        onClick={onAddToCart}
        aria-label="Add to cart"
        className={`
          flex-1 h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-2
          transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
          ${isReady
            ? 'bg-[var(--accent)] text-white shadow-[0_4px_14px_rgba(46,125,50,0.35)]'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
        `}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Add to Cart
      </button>
    </div>
  );
}
