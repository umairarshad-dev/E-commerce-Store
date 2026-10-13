'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRightIcon, ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import SortDropdown, { type SortOption } from './SortDropdown';

export type ViewMode = 'grid' | 'list';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ShopToolbarProps<T extends string = string> {
  title: string;
  /** live result count, e.g. "Showing 24 of 120 products" */
  countText: string;
  breadcrumbs?: Breadcrumb[];
  sortValue: T;
  sortOptions: SortOption<T>[];
  onSortChange: (value: T) => void;
  /** e.g. the mobile Filters button */
  leading?: React.ReactNode;
  /** e.g. the grid/list view toggle */
  trailing?: React.ReactNode;
  /** active filter chips row, rendered below the sticky main row */
  chips?: React.ReactNode;
  /** stick below the navbar on scroll */
  sticky?: boolean;
}

/**
 * Toolbar above the product grid: breadcrumbs, page title + live count on the
 * left, sort dropdown (+ optional extras) on the right, chips row below.
 */
export default function ShopToolbar<T extends string = string>({
  title,
  countText,
  breadcrumbs,
  sortValue,
  sortOptions,
  onSortChange,
  leading,
  trailing,
  chips,
  sticky = false,
}: ShopToolbarProps<T>) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!sticky) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sticky]);

  return (
    <div>
      <div
        className={`${
          sticky
            ? `sticky top-16 z-30 -mx-4 px-4 transition-shadow duration-200 sm:-mx-8 sm:px-8 ${
                scrolled
                  ? 'border-b border-black/5 bg-white/85 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-md'
                  : 'border-b border-transparent bg-white/85 backdrop-blur-md'
              }`
            : ''
        }`}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 pt-1 pb-3 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.label}>
                {index > 0 && (
                  <ChevronRightIcon className="h-3 w-3 text-[var(--muted)]" />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-[var(--muted)] transition-colors duration-150 hover:text-[var(--ink)]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[var(--ink)]">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-[var(--ink)]">
              {title}
            </h1>
            <span className="text-sm tabular-nums text-[var(--muted)]" aria-live="polite">
              {countText}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {leading}
            <SortDropdown value={sortValue} options={sortOptions} onChange={onSortChange} />
            {trailing}
          </div>
        </div>
      </div>

      {chips && <div className="pt-3">{chips}</div>}
    </div>
  );
}

/** Small grid / list view toggle used next to the sort dropdown. */
export function ViewToggle({
  view,
  onChange,
}: {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}) {
  const buttonClass = (active: boolean) =>
    `flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-1 ${
      active
        ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
        : 'text-[var(--muted)] hover:bg-neutral-100 hover:text-[var(--ink)]'
    }`;

  return (
    <div
      role="group"
      aria-label="Change layout"
      className="flex h-11 items-center gap-0.5 rounded-xl border border-black/10 bg-white p-1"
    >
      <button
        type="button"
        aria-label="Grid view"
        aria-pressed={view === 'grid'}
        onClick={() => onChange('grid')}
        className={buttonClass(view === 'grid')}
      >
        <Squares2X2Icon className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="List view"
        aria-pressed={view === 'list'}
        onClick={() => onChange('list')}
        className={buttonClass(view === 'list')}
      >
        <ListBulletIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
