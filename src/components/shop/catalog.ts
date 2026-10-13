import type { Product as PremiumProduct } from '@/components/premium/ProductCard';
import type { SortOption } from '@/components/shop/SortDropdown';
import {
  StarIcon,
  SparklesIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import { products } from '@/components/lib/data/products';

/* ---------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

export type SortValue =
  | 'popular'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'top-rated'
  | 'biggest-discount';

export interface CatalogProduct extends PremiumProduct {
  /** slug key used for category filtering (e.g. "t-shirts") */
  categoryKey: string;
  /** casual | formal | party | gym */
  dressStyle: string;
  /** 0-100, higher = more popular */
  popularity: number;
  /** higher = newer */
  addedAt: number;
  rating: number;
  ratingCount: number;
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface SizeOption {
  label: string;
  inStock: boolean;
}

export interface FilterState {
  categories: string[];
  dressStyles: string[];
  colors: string[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
  /** only show discounted products */
  onSaleOnly: boolean;
}

/* ---------------------------------------------------------------------------
 * Formatting
 * ------------------------------------------------------------------------- */

/** "Rs 1,000" — comma grouped, tabular friendly. Never "PKR". */
export const formatPrice = (value: number): string =>
  `Rs ${Math.round(value).toLocaleString('en-US')}`;

/* ---------------------------------------------------------------------------
 * Sort options (shared by Shop + New Arrivals via SortDropdown)
 * ------------------------------------------------------------------------- */

export const SORT_OPTIONS: SortOption<SortValue>[] = [
  { value: 'popular', label: 'Most Popular', icon: StarIcon },
  { value: 'newest', label: 'Newest First', icon: SparklesIcon },
  { value: 'price-asc', label: 'Price: Low to High', icon: ArrowUpIcon },
  { value: 'price-desc', label: 'Price: High to Low', icon: ArrowDownIcon },
  { value: 'top-rated', label: 'Top Rated', icon: StarIcon },
  { value: 'biggest-discount', label: 'Biggest Discount', icon: TagIcon },
];

const SORT_VALUES = new Set<string>(SORT_OPTIONS.map((o) => o.value));

export function parseSort(value: string | null, fallback: SortValue): SortValue {
  return value && SORT_VALUES.has(value) ? (value as SortValue) : fallback;
}

/* ---------------------------------------------------------------------------
 * Category / dress style metadata for the raw mock products
 * ------------------------------------------------------------------------- */

type ProductMeta = {
  categoryKey: string;
  categoryLabel: string;
  dressStyle: string;
  popularity: number;
  addedAt: number;
  sizes: { label: string; inStock: boolean }[];
};

const SIZE = (label: string, inStock = true) => ({ label, inStock });

const productMeta: Record<number, ProductMeta> = {
  1: {
    categoryKey: 't-shirts',
    categoryLabel: 'T-shirts',
    dressStyle: 'casual',
    popularity: 92,
    addedAt: 5,
    sizes: [SIZE('S'), SIZE('M'), SIZE('L'), SIZE('XL'), SIZE('XXL', false)],
  },
  2: {
    categoryKey: 't-shirts',
    categoryLabel: 'T-shirts',
    dressStyle: 'formal',
    popularity: 71,
    addedAt: 6,
    sizes: [SIZE('S'), SIZE('M'), SIZE('L'), SIZE('XL')],
  },
  3: {
    categoryKey: 't-shirts',
    categoryLabel: 'T-shirts',
    dressStyle: 'casual',
    popularity: 84,
    addedAt: 4,
    sizes: [SIZE('S', false), SIZE('M'), SIZE('L'), SIZE('XL')],
  },
  4: {
    categoryKey: 'jeans',
    categoryLabel: 'Jeans',
    dressStyle: 'casual',
    popularity: 88,
    addedAt: 9,
    sizes: [SIZE('M'), SIZE('L'), SIZE('XL')],
  },
  5: {
    categoryKey: 'shirts',
    categoryLabel: 'Shirts',
    dressStyle: 'casual',
    popularity: 66,
    addedAt: 2,
    sizes: [SIZE('S'), SIZE('M'), SIZE('L'), SIZE('XL')],
  },
  6: {
    categoryKey: 't-shirts',
    categoryLabel: 'T-shirts',
    dressStyle: 'casual',
    popularity: 77,
    addedAt: 7,
    sizes: [SIZE('S'), SIZE('M'), SIZE('L'), SIZE('XL')],
  },
  7: {
    categoryKey: 'shirts',
    categoryLabel: 'Shirts',
    dressStyle: 'formal',
    popularity: 62,
    addedAt: 1,
    sizes: [SIZE('M'), SIZE('L'), SIZE('XL')],
  },
  8: {
    categoryKey: 't-shirts',
    categoryLabel: 'T-shirts',
    dressStyle: 'casual',
    popularity: 95,
    addedAt: 8,
    sizes: [SIZE('S'), SIZE('M'), SIZE('L'), SIZE('XL', false)],
  },
  9: {
    categoryKey: 'shorts',
    categoryLabel: 'Shorts',
    dressStyle: 'casual',
    popularity: 58,
    addedAt: 3,
    sizes: [SIZE('S'), SIZE('M')],
  },
};

/* ---------------------------------------------------------------------------
 * Shop catalog (built from the shared mock product data)
 * ------------------------------------------------------------------------- */

export const shopCatalog: CatalogProduct[] = products.map((product) => {
  const meta = productMeta[product.id];
  return {
    id: product.id.toString(),
    slug: product.name.toLowerCase().replace(/\s+/g, '-'),
    title: product.name,
    category: 'MEN · CLOTHING',
    fabric: product.materials?.toUpperCase(),
    price: product.currentPrice,
    compareAtPrice: product.originalPrice,
    badge: product.discount ? 'SALE' : undefined,
    images: [
      // primary image always exists in /public; hover views only if they live
      // in the known-good ecommerce-assets folder (some mock entries 404)
      product.image,
      ...(product.images ?? []).filter(
        (img) => img !== product.image && img.startsWith('/images/ecommerce-assets/'),
      ),
    ],
    colors: (product.colors ?? []).map((c) => ({ name: c.name, hex: c.code })),
    sizes: meta.sizes,
    categoryKey: meta.categoryKey,
    dressStyle: meta.dressStyle,
    popularity: meta.popularity,
    addedAt: meta.addedAt,
    rating: product.rating,
    ratingCount: product.reviewCount ?? product.reviews ?? 0,
  };
});

/* ---------------------------------------------------------------------------
 * New Arrivals catalog
 * ------------------------------------------------------------------------- */

export const newArrivalsCatalog: CatalogProduct[] = [
  {
    id: 'na-1',
    slug: 'modern-striped-shirt',
    title: 'Modern Striped Shirt',
    category: 'MEN · SHIRTS',
    fabric: 'COTTON',
    price: 4999,
    compareAtPrice: 6999,
    badge: 'NEW',
    images: ['/images/ecommerce-assets/shirt01.png'],
    colors: [
      { name: 'blue-white', hex: '#4169e1' },
      { name: 'black-white', hex: '#000' },
    ],
    sizes: [SIZE('S'), SIZE('M'), SIZE('L'), SIZE('XL')],
    categoryKey: 'shirts',
    dressStyle: 'casual',
    popularity: 88,
    addedAt: 4,
    rating: 4.6,
    ratingCount: 128,
  },
  {
    id: 'na-2',
    slug: 'graphic-print-tshirt',
    title: 'Graphic Print T-Shirt',
    category: 'MEN · T-SHIRTS',
    fabric: 'COTTON',
    price: 2999,
    compareAtPrice: 3999,
    badge: 'NEW',
    images: ['/images/ecommerce-assets/shirt02.png'],
    colors: [
      { name: 'white', hex: '#fff' },
      { name: 'black', hex: '#000' },
      { name: 'gray', hex: '#808080' },
    ],
    sizes: [SIZE('S'), SIZE('M'), SIZE('L'), SIZE('XL')],
    categoryKey: 't-shirts',
    dressStyle: 'casual',
    popularity: 95,
    addedAt: 3,
    rating: 4.4,
    ratingCount: 214,
  },
  {
    id: 'na-3',
    slug: 'premium-shorts',
    title: 'Premium Shorts',
    category: 'MEN · SHORTS',
    fabric: 'COTTON',
    price: 3499,
    compareAtPrice: 4999,
    badge: 'NEW',
    images: ['/images/ecommerce-assets/pent01.png'],
    colors: [
      { name: 'khaki', hex: '#c3b091' },
      { name: 'navy', hex: '#000080' },
      { name: 'black', hex: '#000' },
    ],
    sizes: [SIZE('S'), SIZE('M'), SIZE('L', false), SIZE('XL')],
    categoryKey: 'shorts',
    dressStyle: 'casual',
    popularity: 74,
    addedAt: 2,
    rating: 4.2,
    ratingCount: 96,
  },
  {
    id: 'na-4',
    slug: 'slim-fit-denim',
    title: 'Slim Fit Denim',
    category: 'MEN · JEANS',
    fabric: 'DENIM',
    price: 5999,
    compareAtPrice: 8499,
    badge: 'NEW',
    images: ['/images/ecommerce-assets/pent02.png'],
    colors: [
      { name: 'blue', hex: '#4169e1' },
      { name: 'black', hex: '#000' },
    ],
    sizes: [SIZE('28'), SIZE('30'), SIZE('32'), SIZE('34'), SIZE('36')],
    categoryKey: 'jeans',
    dressStyle: 'casual',
    popularity: 90,
    addedAt: 1,
    rating: 4.7,
    ratingCount: 152,
  },
];

/* ---------------------------------------------------------------------------
 * Color palette
 * ------------------------------------------------------------------------- */

export const COLOR_PALETTE: ColorOption[] = [
  { name: 'black', hex: '#111111' },
  { name: 'white', hex: '#ffffff' },
  { name: 'gray', hex: '#808080' },
  { name: 'navy', hex: '#000080' },
  { name: 'blue', hex: '#4169e1' },
  { name: 'red', hex: '#dc2626' },
  { name: 'khaki', hex: '#c3b091' },
];

/** True for light swatches where the check icon must be dark. */
export function isLightColor(hex: string): boolean {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  // relative luminance approximation
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.75;
}

/* ---------------------------------------------------------------------------
 * Filter options with counts (computed from a catalog)
 * ------------------------------------------------------------------------- */

const CATEGORY_DEFS = [
  { value: 't-shirts', label: 'T-shirts' },
  { value: 'shirts', label: 'Shirts' },
  { value: 'jeans', label: 'Jeans' },
  { value: 'shorts', label: 'Shorts' },
];

const DRESS_STYLE_DEFS = [
  { value: 'casual', label: 'Casual' },
  { value: 'formal', label: 'Formal' },
  { value: 'party', label: 'Party' },
  { value: 'gym', label: 'Gym' },
];

function withCounts<T extends { value: string; label: string }>(
  defs: T[],
  matches: (product: CatalogProduct, value: string) => boolean,
  catalog: CatalogProduct[],
): (T & { count: number })[] {
  return defs
    .map((def) => ({
      ...def,
      count: catalog.filter((p) => matches(p, def.value)).length,
    }))
    .filter((def) => def.count > 0);
}

export function getCategoryOptions(catalog: CatalogProduct[]): FilterOption[] {
  return withCounts(
    CATEGORY_DEFS,
    (p, v) => p.categoryKey === v,
    catalog,
  );
}

export function getDressStyleOptions(catalog: CatalogProduct[]): FilterOption[] {
  return withCounts(
    DRESS_STYLE_DEFS,
    (p, v) => p.dressStyle === v,
    catalog,
  );
}

export function getColorOptions(catalog: CatalogProduct[]): ColorOption[] {
  return COLOR_PALETTE.filter((color) =>
    catalog.some((p) => p.colors.some((c) => colorMatches(c.name, color.name))),
  );
}

export function getSizeOptions(catalog: CatalogProduct[]): SizeOption[] {
  const labels = new Set<string>();
  catalog.forEach((p) => p.sizes.forEach((s) => labels.add(s.label)));
  return Array.from(labels).map((label) => ({
    label,
    inStock: catalog.some((p) =>
      p.sizes.some((s) => s.label === label && s.inStock),
    ),
  }));
}

/** "blue-black" matches the palette entries blue + black. */
function colorMatches(productColor: string, selected: string): boolean {
  const a = productColor.toLowerCase();
  const b = selected.toLowerCase();
  return a === b || a.includes(b);
}

/* ---------------------------------------------------------------------------
 * Price bounds
 * ------------------------------------------------------------------------- */

export function getPriceBounds(catalog: CatalogProduct[], step = 100) {
  const prices = catalog.map((p) => p.price);
  const rawMin = prices.length ? Math.min(...prices) : 0;
  const rawMax = prices.length ? Math.max(...prices) : 10000;
  return {
    min: Math.floor(rawMin / step) * step,
    max: Math.ceil(rawMax / step) * step,
    step,
  };
}

/* ---------------------------------------------------------------------------
 * Filtering + sorting (pure)
 * ------------------------------------------------------------------------- */

export function createDefaultFilters(catalog: CatalogProduct[]): FilterState {
  const bounds = getPriceBounds(catalog);
  return {
    categories: [],
    dressStyles: [],
    colors: [],
    sizes: [],
    minPrice: bounds.min,
    maxPrice: bounds.max,
    onSaleOnly: false,
  };
}

export function applyFilters(
  list: CatalogProduct[],
  filters: FilterState,
): CatalogProduct[] {
  return list.filter((product) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.categoryKey)
    ) {
      return false;
    }
    if (
      filters.dressStyles.length > 0 &&
      !filters.dressStyles.includes(product.dressStyle)
    ) {
      return false;
    }
    if (
      filters.colors.length > 0 &&
      !product.colors.some((c) =>
        filters.colors.some((selected) => colorMatches(c.name, selected)),
      )
    ) {
      return false;
    }
    if (
      filters.sizes.length > 0 &&
      !product.sizes.some((s) => filters.sizes.includes(s.label))
    ) {
      return false;
    }
    if (filters.onSaleOnly && discountPercent(product) <= 0) {
      return false;
    }
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    return true;
  });
}

export function discountPercent(product: CatalogProduct): number {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) return 0;
  return Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100,
  );
}

export function sortProducts(
  list: CatalogProduct[],
  sort: SortValue,
): CatalogProduct[] {
  const sorted = [...list];
  const byPopularity = (a: CatalogProduct, b: CatalogProduct) =>
    b.popularity - a.popularity;
  switch (sort) {
    case 'newest':
      return sorted.sort(
        (a, b) => b.addedAt - a.addedAt || byPopularity(a, b),
      );
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price || byPopularity(a, b));
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price || byPopularity(a, b));
    case 'top-rated':
      return sorted.sort((a, b) => b.rating - a.rating || byPopularity(a, b));
    case 'biggest-discount':
      return sorted.sort(
        (a, b) => discountPercent(b) - discountPercent(a) || byPopularity(a, b),
      );
    case 'popular':
    default:
      return sorted.sort(byPopularity);
  }
}
