'use client';

import React from 'react';
import type { SizeOption } from './catalog';

interface SizeFilterProps {
  sizes: SizeOption[];
  selected: string[];
  onToggle: (value: string) => void;
}

/**
 * Size chips matching the ProductCard chips: h-9, min-w-[44px], rounded-lg,
 * text-xs font-semibold. Selected = accent border + accent-soft background.
 * Out-of-stock sizes are faded and disabled.
 */
export default function SizeFilter({
  sizes,
  selected,
  onToggle,
}: SizeFilterProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {sizes.map((size) => {
        const checked = selected.includes(size.label);
        return (
          <button
            key={size.label}
            type="button"
            disabled={!size.inStock}
            onClick={() => onToggle(size.label)}
            aria-pressed={checked}
            aria-label={`Size ${size.label}${size.inStock ? '' : ' (out of stock)'}`}
            className={`flex h-9 min-w-[44px] items-center justify-center rounded-lg border text-xs font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${
              checked
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                : size.inStock
                  ? 'border-black/10 bg-white text-[var(--ink)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]'
                  : 'cursor-not-allowed border-black/5 bg-white text-[var(--ink)] opacity-40 line-through'
            }`}
          >
            {size.label}
          </button>
        );
      })}
    </div>
  );
}
