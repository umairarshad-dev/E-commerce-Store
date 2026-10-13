'use client';

import React from 'react';

type SizeItem = { label: string; inStock: boolean };

interface SizeChipsProps {
  sizes: SizeItem[];
  selectedSize?: string;
  onSelect?: (size: string) => void;
  maxDisplay?: number;
  className?: string;
  ariaLabel?: string;
}

/**
 * Size chips matching the shop filters styling:
 * h-9, min-w-[44px], rounded-lg, border, text-xs font-semibold.
 * Selected = accent border + accent-soft background + accent text.
 * Out-of-stock sizes are faded and disabled.
 */
export default function SizeChips({
  sizes,
  selectedSize,
  onSelect,
  maxDisplay,
  className = '',
  ariaLabel,
}: SizeChipsProps) {
  if (!sizes || sizes.length === 0) return null;

  const visible = maxDisplay ? sizes.slice(0, maxDisplay) : sizes;

  return (
    <div
      className={`flex flex-wrap gap-2 ${className}`.trim()}
      role="group"
      aria-label={ariaLabel ?? 'Select size'}
    >
      {visible.map((item) => {
        const isSelected = selectedSize === item.label;
        return (
          <button
            key={item.label}
            type="button"
            aria-pressed={isSelected}
            disabled={!item.inStock}
            onClick={() => onSelect?.(item.label)}
            className={`inline-flex h-9 min-w-[44px] items-center justify-center rounded-lg border px-3 text-xs font-semibold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)] focus-visible:border-[var(--accent)] ${
              isSelected
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                : item.inStock
                  ? 'border-black/15 bg-white text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                  : 'cursor-not-allowed border-black/10 bg-neutral-50 text-[var(--muted)] opacity-60'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
