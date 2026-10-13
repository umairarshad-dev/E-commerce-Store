'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FilterSections } from './FiltersSidebar';
import type { CatalogProduct, FilterState } from './catalog';

interface MobileFiltersDrawerProps {
  open: boolean;
  onClose: () => void;
  catalog: CatalogProduct[];
  /** local draft — filters only commit when "Show results" is pressed */
  value: FilterState | null;
  onChange: (patch: Partial<FilterState>) => void;
  onApply: () => void;
  onClearAll: () => void;
  /** live count for the draft state */
  resultCount: number;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Bottom-sheet drawer with the same filter sections as the desktop sidebar.
 * Focus trap, ESC to close, body scroll lock, drag handle and a sticky
 * footer whose "Show results" button commits the draft.
 */
export default function MobileFiltersDrawer({
  open,
  onClose,
  catalog,
  value,
  onChange,
  onApply,
  onClearAll,
  resultCount,
}: MobileFiltersDrawerProps) {
  const [rendered, setRendered] = useState(false);
  const [entered, setEntered] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Enter/exit animation lifecycle
  useEffect(() => {
    if (open) {
      setRendered(true);
      const raf = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(raf);
    }
    setEntered(false);
    const timer = setTimeout(() => setRendered(false), 250);
    return () => clearTimeout(timer);
  }, [open]);

  // Body scroll lock, focus trap, ESC
  useEffect(() => {
    if (!rendered) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => closeBtnRef.current?.focus(), 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown, true);
      previouslyFocused?.focus?.();
    };
  }, [rendered, onClose]);

  if (!rendered || !value) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" aria-hidden={false}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Sheet */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filter products"
        className={`absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-3xl bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-out ${
          entered ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <span className="h-1.5 w-10 rounded-full bg-neutral-200" aria-hidden="true" />
        </div>

        <div className="flex items-center justify-between px-5 pt-2 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-extrabold text-[var(--ink)]">
              Filters
            </h2>
            <span
              className="text-xs tabular-nums text-[var(--muted)]"
              aria-live="polite"
            >
              {resultCount} {resultCount === 1 ? 'result' : 'results'}
            </span>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 text-[var(--ink)] transition-colors duration-150 hover:border-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
          >
            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable sections */}
        <div className="thin-scrollbar flex-1 overflow-y-auto px-5 pb-4">
          <FilterSections catalog={catalog} value={value} onChange={onChange} />
        </div>

        {/* Sticky footer — filters only apply here on mobile */}
        <div className="border-t border-black/5 bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClearAll}
              className="h-11 shrink-0 rounded-xl border border-black/10 px-5 text-sm font-semibold text-[var(--ink)] transition-colors duration-150 hover:border-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={onApply}
              className="h-11 flex-1 rounded-xl bg-[var(--accent)] text-sm font-semibold text-white shadow-[0_4px_14px_rgba(46,125,50,0.3)] transition-colors duration-150 hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
            >
              Show {resultCount} {resultCount === 1 ? 'result' : 'results'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
