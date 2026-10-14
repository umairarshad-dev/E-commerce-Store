'use client';

import React, { useId } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FilterSectionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

/**
 * Collapsible accordion section used inside the filters sidebar and the
 * mobile filters drawer. Smooth 200ms height transition (the global
 * prefers-reduced-motion media query neutralizes it when requested).
 */
export default function FilterSection({
  title,
  open,
  onToggle,
  children,
}: FilterSectionProps) {
  const contentId = useId();

  return (
    <section className="border-b border-black/5 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex w-full items-center justify-between gap-2 py-3.5 text-left select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-lg"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--ink)]">
          {title}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 shrink-0 text-[var(--muted)] transition-transform duration-200 ease-out ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* grid-template-rows trick = smooth auto height transition */}
      <div
        id={contentId}
        role="region"
        aria-label={title}
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pb-4">{children}</div>
        </div>
      </div>
    </section>
  );
}
