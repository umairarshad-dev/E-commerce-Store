'use client';

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { FilterChip } from './useProductFilters';

interface ActiveFilterChipsProps {
  chips: FilterChip[];
  onClearAll: () => void;
  /** live result count, e.g. "Showing 24 of 120 products" */
  countText: string;
}

/**
 * Pill row above the product grid: one removable chip per active filter,
 * a "Clear all" link and the live result count.
 */
export default function ActiveFilterChips({
  chips,
  onClearAll,
  countText,
}: ActiveFilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-neutral-50 py-1.5 pl-3 pr-1.5 text-xs font-semibold text-[var(--ink)] transition-colors duration-150"
        >
          {chip.label}
          <button
            type="button"
            onClick={chip.onRemove}
            aria-label={`Remove filter ${chip.label}`}
            className="flex h-4.5 w-4.5 items-center justify-center rounded-full text-[var(--muted)] transition-colors duration-150 hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <XMarkIcon className="h-3 w-3" strokeWidth={2.5} />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="ml-1 rounded-full px-2 py-1.5 text-xs font-semibold text-[var(--accent)] underline-offset-2 transition-colors duration-150 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
      >
        Clear all
      </button>

      <span
        className="ml-auto text-xs tabular-nums text-[var(--muted)]"
        aria-live="polite"
      >
        {countText}
      </span>
    </div>
  );
}
