'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  applyFilters,
  createDefaultFilters,
  formatPrice,
  getPriceBounds,
  parseSort,
  sortProducts,
  type CatalogProduct,
  type FilterState,
  type SortValue,
} from './catalog';

export interface FilterChip {
  id: string;
  label: string;
  onRemove: () => void;
}

export interface ProductFilters {
  filters: FilterState;
  priceRange: [number, number];
  sort: SortValue;
  /** results currently displayed (previous results while pending) */
  results: CatalogProduct[];
  /** count of the currently displayed results */
  count: number;
  total: number;
  /** true while newer results are swapping in */
  isPending: boolean;
  activeCount: number;
  chips: FilterChip[];
  toggleCategory: (value: string) => void;
  toggleDressStyle: (value: string) => void;
  toggleColor: (value: string) => void;
  toggleSize: (value: string) => void;
  /** replace a whole filter list in a single URL update (sidebar edits) */
  setFilterList: (
    key: 'categories' | 'dressStyles' | 'colors' | 'sizes',
    values: string[],
  ) => void;
  setPriceRange: (range: [number, number]) => void;
  setSort: (sort: SortValue) => void;
  setOnSaleOnly: (value: boolean) => void;
  applyDraftFilters: (draft: FilterState) => void;
  clearAll: () => void;
}

const PRICE_DEBOUNCE_MS = 300;
const RESULTS_SWAP_MS = 220;

const csv = (values: string[]) => (values.length ? values.join(',') : undefined);

function readCsv(params: URLSearchParams, key: string): string[] {
  const raw = params.get(key);
  if (!raw) return [];
  return Array.from(
    new Set(raw.split(',').map((v) => v.trim()).filter(Boolean)),
  );
}

/**
 * Reads/writes every filter + sort value in the URL query string so filters are
 * shareable and survive refresh, filters the mock catalog, and exposes a short
 * "pending" window so the previous results can stay visible (dimmed) while new
 * results swap in.
 */
export function useProductFilters(
  catalog: CatalogProduct[],
  defaultSort: SortValue = 'popular',
): ProductFilters {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const bounds = useMemo(() => getPriceBounds(catalog), [catalog]);
  const defaults = useMemo(() => createDefaultFilters(catalog), [catalog]);

  const filters = useMemo<FilterState>(() => {
    const minParam = Number(searchParams.get('min'));
    const maxParam = Number(searchParams.get('max'));
    let minPrice = Number.isFinite(minParam) && minParam > 0 ? minParam : defaults.minPrice;
    let maxPrice = Number.isFinite(maxParam) && maxParam > 0 ? maxParam : defaults.maxPrice;
    minPrice = Math.min(Math.max(minPrice, bounds.min), bounds.max);
    maxPrice = Math.min(Math.max(maxPrice, bounds.min), bounds.max);
    if (minPrice > maxPrice) [minPrice, maxPrice] = [maxPrice, minPrice];
    return {
      categories: readCsv(searchParams, 'category'),
      dressStyles: readCsv(searchParams, 'style'),
      colors: readCsv(searchParams, 'color'),
      sizes: readCsv(searchParams, 'size'),
      minPrice,
      maxPrice,
      onSaleOnly: searchParams.get('sale') === '1',
    };
  }, [searchParams, defaults, bounds]);

  const sort = useMemo(
    () => parseSort(searchParams.get('sort'), defaultSort),
    [searchParams, defaultSort],
  );

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === '') next.delete(key);
        else next.set(key, value);
      }
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  /* -----------------------------------------------------------------------
   * Toggle helpers (desktop applies instantly)
   * --------------------------------------------------------------------- */

  const toggleCategory = useCallback(
    (value: string) => {
      const current = filters.categories;
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updateParams({ category: csv(next) });
    },
    [filters.categories, updateParams],
  );

  const toggleDressStyle = useCallback(
    (value: string) => {
      const current = filters.dressStyles;
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updateParams({ style: csv(next) });
    },
    [filters.dressStyles, updateParams],
  );

  const toggleColor = useCallback(
    (value: string) => {
      const current = filters.colors;
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updateParams({ color: csv(next) });
    },
    [filters.colors, updateParams],
  );

  const toggleSize = useCallback(
    (value: string) => {
      const current = filters.sizes;
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updateParams({ size: csv(next) });
    },
    [filters.sizes, updateParams],
  );

  const setFilterList = useCallback(
    (
      key: 'categories' | 'dressStyles' | 'colors' | 'sizes',
      values: string[],
    ) => {
      const paramKey =
        key === 'categories'
          ? 'category'
          : key === 'dressStyles'
            ? 'style'
            : key === 'colors'
              ? 'color'
              : 'size';
      updateParams({ [paramKey]: csv(values) });
    },
    [updateParams],
  );

  /* -----------------------------------------------------------------------
   * Price: local draft state for instant slider feedback, debounced URL write
   * --------------------------------------------------------------------- */

  const [priceRange, setPriceDraft] = useState<[number, number]>([
    filters.minPrice,
    filters.maxPrice,
  ]);
  const committedRef = useRef<[number, number]>([
    filters.minPrice,
    filters.maxPrice,
  ]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Sync the draft when the URL price changes from elsewhere (chips, back/forward)
  useEffect(() => {
    const urlRange: [number, number] = [filters.minPrice, filters.maxPrice];
    if (
      urlRange[0] !== committedRef.current[0] ||
      urlRange[1] !== committedRef.current[1]
    ) {
      committedRef.current = urlRange;
      setPriceDraft(urlRange);
    }
  }, [filters.minPrice, filters.maxPrice]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const setPriceRange = useCallback(
    (range: [number, number]) => {
      setPriceDraft(range);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        committedRef.current = range;
        updateParams({
          min: range[0] === bounds.min ? undefined : String(range[0]),
          max: range[1] === bounds.max ? undefined : String(range[1]),
        });
      }, PRICE_DEBOUNCE_MS);
    },
    [bounds, updateParams],
  );

  const priceChipActive =
    filters.minPrice !== defaults.minPrice ||
    filters.maxPrice !== defaults.maxPrice;

  const setSort = useCallback(
    (value: SortValue) => {
      updateParams({ sort: value === defaultSort ? undefined : value });
    },
    [defaultSort, updateParams],
  );

  const setOnSaleOnly = useCallback(
    (value: boolean) => {
      updateParams({ sale: value ? '1' : undefined });
    },
    [updateParams],
  );

  const applyDraftFilters = useCallback(
    (draft: FilterState) => {
      committedRef.current = [draft.minPrice, draft.maxPrice];
      setPriceDraft([draft.minPrice, draft.maxPrice]);
      updateParams({
        category: csv(draft.categories),
        style: csv(draft.dressStyles),
        color: csv(draft.colors),
        size: csv(draft.sizes),
        min: draft.minPrice === bounds.min ? undefined : String(draft.minPrice),
        max: draft.maxPrice === bounds.max ? undefined : String(draft.maxPrice),
        sale: draft.onSaleOnly ? '1' : undefined,
      });
    },
    [bounds, updateParams],
  );

  const clearAll = useCallback(() => {
    clearTimeout(timerRef.current);
    committedRef.current = [defaults.minPrice, defaults.maxPrice];
    setPriceDraft([defaults.minPrice, defaults.maxPrice]);
    router.replace(pathname, { scroll: false });
  }, [defaults, router, pathname]);

  /* -----------------------------------------------------------------------
   * Filtering + sorting
   * --------------------------------------------------------------------- */

  const filtered = useMemo(
    () => sortProducts(applyFilters(catalog, filters), sort),
    [catalog, filters, sort],
  );

  // Keep previous results visible (dimmed) while new results swap in.
  const [display, setDisplay] = useState<{
    list: CatalogProduct[];
    pending: boolean;
  }>({ list: filtered, pending: false });

  useEffect(() => {
    setDisplay((d) => (d.list === filtered ? d : { list: d.list, pending: true }));
    const timer = setTimeout(
      () =>
        setDisplay((d) =>
          d.list === filtered ? d : { list: filtered, pending: false },
        ),
      RESULTS_SWAP_MS,
    );
    return () => clearTimeout(timer);
  }, [filtered]);

  /* -----------------------------------------------------------------------
   * Active chips
   * --------------------------------------------------------------------- */

  const labelize = (value: string) =>
    value
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');

  const chips = useMemo<FilterChip[]>(() => {
    const list: FilterChip[] = [];

    filters.categories.forEach((value) =>
      list.push({
        id: `category-${value}`,
        label: labelize(value),
        onRemove: () => toggleCategory(value),
      }),
    );
    filters.dressStyles.forEach((value) =>
      list.push({
        id: `style-${value}`,
        label: labelize(value),
        onRemove: () => toggleDressStyle(value),
      }),
    );
    filters.colors.forEach((value) =>
      list.push({
        id: `color-${value}`,
        label: labelize(value),
        onRemove: () => toggleColor(value),
      }),
    );
    filters.sizes.forEach((value) =>
      list.push({
        id: `size-${value}`,
        label: `Size: ${value}`,
        onRemove: () => toggleSize(value),
      }),
    );
    if (filters.onSaleOnly) {
      list.push({
        id: 'sale',
        label: 'On Sale',
        onRemove: () => setOnSaleOnly(false),
      });
    }
    if (priceChipActive) {
      list.push({
        id: 'price',
        label: `${formatPrice(filters.minPrice)} – ${formatPrice(filters.maxPrice)}`,
        onRemove: () => {
          clearTimeout(timerRef.current);
          committedRef.current = [defaults.minPrice, defaults.maxPrice];
          setPriceDraft([defaults.minPrice, defaults.maxPrice]);
          updateParams({ min: undefined, max: undefined });
        },
      });
    }
    return list;
  }, [
    filters,
    priceChipActive,
    defaults,
    toggleCategory,
    toggleDressStyle,
    toggleColor,
    toggleSize,
    setOnSaleOnly,
    updateParams,
  ]);

  const activeCount =
    filters.categories.length +
    filters.dressStyles.length +
    filters.colors.length +
    filters.sizes.length +
    (filters.onSaleOnly ? 1 : 0) +
    (priceChipActive ? 1 : 0);

  return {
    filters,
    priceRange,
    sort,
    results: display.list,
    count: display.list.length,
    total: catalog.length,
    isPending: display.pending,
    activeCount,
    chips,
    toggleCategory,
    toggleDressStyle,
    toggleColor,
    toggleSize,
    setFilterList,
    setPriceRange,
    setSort,
    setOnSaleOnly,
    applyDraftFilters,
    clearAll,
  };
}
