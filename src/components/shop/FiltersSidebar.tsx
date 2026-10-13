'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import FilterSection from './FilterSection';
import CheckboxFilter from './CheckboxFilter';
import PriceRangeSlider from './PriceRangeSlider';
import ColorFilter from './ColorFilter';
import SizeFilter from './SizeFilter';
import {
  getCategoryOptions,
  getColorOptions,
  getDressStyleOptions,
  getPriceBounds,
  getSizeOptions,
  type CatalogProduct,
  type FilterState,
} from './catalog';

const SECTION_KEYS = ['categories', 'price', 'colors', 'size', 'style'] as const;
type SectionKey = (typeof SECTION_KEYS)[number];

const DEFAULT_OPEN: Record<SectionKey, boolean> = {
  categories: true,
  price: true,
  colors: true,
  size: true,
  style: false,
};

export interface FilterSectionsProps {
  catalog: CatalogProduct[];
  value: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
}

const toggleValue = (list: string[], value: string) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

/**
 * The five collapsible filter sections. Shared between the desktop sidebar and
 * the mobile drawer so both render identical controls; only their state source
 * differs (live URL state vs. local draft).
 */
export function FilterSections({
  catalog,
  value,
  onChange,
}: FilterSectionsProps) {
  const [open, setOpen] = useState<Record<SectionKey, boolean>>(DEFAULT_OPEN);
  const toggle = useCallback(
    (key: SectionKey) => setOpen((prev) => ({ ...prev, [key]: !prev[key] })),
    [],
  );

  const categoryOptions = useMemo(() => getCategoryOptions(catalog), [catalog]);
  const styleOptions = useMemo(() => getDressStyleOptions(catalog), [catalog]);
  const colorOptions = useMemo(() => getColorOptions(catalog), [catalog]);
  const sizeOptions = useMemo(() => getSizeOptions(catalog), [catalog]);
  const bounds = useMemo(() => getPriceBounds(catalog), [catalog]);

  return (
    <div className="divide-none">
      <FilterSection
        title="Categories"
        open={open.categories}
        onToggle={() => toggle('categories')}
      >
        <CheckboxFilter
          options={categoryOptions}
          selected={value.categories}
          onToggle={(v) => onChange({ categories: toggleValue(value.categories, v) })}
        />
      </FilterSection>

      <FilterSection title="Price" open={open.price} onToggle={() => toggle('price')}>
        <PriceRangeSlider
          value={[value.minPrice, value.maxPrice]}
          bounds={bounds}
          onChange={(range) =>
            onChange({ minPrice: range[0], maxPrice: range[1] })
          }
        />
      </FilterSection>

      <FilterSection title="Colors" open={open.colors} onToggle={() => toggle('colors')}>
        <ColorFilter
          colors={colorOptions}
          selected={value.colors}
          onToggle={(v) => onChange({ colors: toggleValue(value.colors, v) })}
        />
      </FilterSection>

      <FilterSection title="Size" open={open.size} onToggle={() => toggle('size')}>
        <SizeFilter
          sizes={sizeOptions}
          selected={value.sizes}
          onToggle={(v) => onChange({ sizes: toggleValue(value.sizes, v) })}
        />
      </FilterSection>

      <FilterSection
        title="Dress Style"
        open={open.style}
        onToggle={() => toggle('style')}
      >
        <CheckboxFilter
          options={styleOptions}
          selected={value.dressStyles}
          onToggle={(v) => onChange({ dressStyles: toggleValue(value.dressStyles, v) })}
        />
      </FilterSection>
    </div>
  );
}

interface FiltersSidebarProps {
  catalog: CatalogProduct[];
  value: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
  onCollapse?: () => void;
  className?: string;
}

/**
 * Desktop filters card: rounded-3xl white card, sticky below the navbar with
 * its own thin-scrollable max height.
 */
export default function FiltersSidebar({
  catalog,
  value,
  onChange,
  onClearAll,
  hasActiveFilters,
  onCollapse,
  className = '',
}: FiltersSidebarProps) {
  return (
    <aside className={`hidden lg:block lg:w-[280px] lg:shrink-0 ${className}`}>
      <div className="thin-scrollbar max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl border border-black/5 bg-white p-5 shadow-soft lg:sticky lg:top-24 lg:self-start">
        <div className="mb-1 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent-soft)]">
              <FunnelIcon className="h-4 w-4 text-[var(--accent)]" />
            </span>
            <h2 className="font-heading text-lg font-extrabold text-[var(--ink)]">
              Filters
            </h2>
          </div>
          <div className="flex items-center gap-1">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onClearAll}
                className="rounded-lg px-2 py-1 text-xs font-semibold text-[var(--accent)] transition-colors duration-150 hover:bg-[var(--accent-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              >
                Clear all
              </button>
            )}
            {onCollapse && (
              <button
                type="button"
                onClick={onCollapse}
                aria-label="Collapse filters"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--muted)] transition-colors duration-150 hover:bg-neutral-100 hover:text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <FilterSections catalog={catalog} value={value} onChange={onChange} />
      </div>
    </aside>
  );
}

/** Skeleton shown while the filter card hydrates. */
export function FiltersSidebarSkeleton() {
  return (
    <aside className="hidden lg:block lg:w-[280px] lg:shrink-0">
      <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-soft lg:sticky lg:top-24">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-neutral-100 animate-pulse" />
          <div className="h-5 w-20 rounded bg-neutral-100 animate-pulse" />
        </div>
        {[60, 90, 75, 85, 70].map((w, i) => (
          <div key={i} className="border-t border-black/5 py-4">
            <div className="h-3 rounded bg-neutral-100 animate-pulse" style={{ width: `${w}%` }} />
            <div className="mt-3 space-y-2">
              {[0, 1, 2].map((j) => (
                <div key={j} className="h-4 rounded bg-neutral-100 animate-pulse" style={{ width: `${w - j * 8}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
