'use client';

import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import type { FilterOption } from './catalog';

interface CheckboxFilterProps {
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
  /** show this many items before collapsing behind "Show more" */
  visibleCount?: number;
}

/**
 * Checkbox rows with item counts — used for Categories and Dress Style.
 * Shows at most `visibleCount` (default 5) items, then a "Show more" toggle.
 */
export default function CheckboxFilter({
  options,
  selected,
  onToggle,
  visibleCount = 5,
}: CheckboxFilterProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = options.length > visibleCount;
  const visible = expanded ? options : options.slice(0, visibleCount);

  return (
    <div className="space-y-0.5">
      {visible.map((option) => {
        const checked = selected.includes(option.value);
        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-colors duration-150 hover:bg-neutral-50 ${
              checked ? 'bg-neutral-50' : ''
            }`}
          >
            <input
              type="checkbox"
              className="peer sr-only"
              checked={checked}
              onChange={() => onToggle(option.value)}
            />
            <span
              aria-hidden="true"
              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent)] peer-focus-visible:ring-offset-2 ${
                checked
                  ? 'border-[var(--accent)] bg-[var(--accent)]'
                  : 'border-black/15 bg-white'
              }`}
            >
              {checked && (
                <CheckIcon className="h-3 w-3 text-white" strokeWidth={3} />
              )}
            </span>
            <span className="text-sm text-[var(--ink)]">{option.label}</span>
            <span className="ml-auto text-xs tabular-nums text-[var(--muted)]">
              ({option.count})
            </span>
          </label>
        );
      })}

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="ml-2 mt-1 rounded-md px-2 py-1 text-xs font-semibold text-[var(--accent)] transition-colors duration-150 hover:bg-[var(--accent-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
        >
          {expanded ? 'Show less' : `Show more (${options.length - visibleCount})`}
        </button>
      )}
    </div>
  );
}
