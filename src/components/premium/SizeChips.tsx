'use client';

import React from 'react';

interface SizeChipsProps {
  sizes: { label: string; inStock: boolean }[];
  selectedSize: string;
  onSelect: (size: string) => void;
  maxDisplay?: number;
  className?: string;
}

export default function SizeChips({
  sizes,
  selectedSize,
  onSelect,
  maxDisplay = 4,
  className = '',
}: SizeChipsProps) {
  const displaySizes = sizes.slice(0, maxDisplay);
  const remainingCount = sizes.length - maxDisplay;

  return (
    <div className={`flex flex-nowrap gap-1.5 overflow-hidden ${className}`}>
      {displaySizes.map((size) => (
        <button
          key={size.label}
          onClick={() => size.inStock && onSelect(size.label)}
          disabled={!size.inStock}
          className={`
            relative h-6 min-w-[28px] px-2 text-[11px] font-medium rounded-md border transition-all duration-200 flex-shrink-0
            ${selectedSize === size.label && size.inStock
              ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
              : size.inStock
              ? 'border-gray-300 text-[var(--ink)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]'
              : 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
            }
            focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
          `}
          aria-label={`Select size ${size.label}${!size.inStock ? ' (out of stock)' : ''}`}
          aria-pressed={selectedSize === size.label}
        >
          {size.label}
          {!size.inStock && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-full h-[1px] bg-gray-400 rotate-45" />
            </span>
          )}
        </button>
      ))}
      {remainingCount > 0 && (
        <span className="h-6 min-w-[28px] px-2 text-[11px] font-medium text-[var(--muted)] flex items-center flex-shrink-0">
          +{remainingCount}
        </span>
      )}
    </div>
  );
}
