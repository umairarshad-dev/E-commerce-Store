'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import {
  FunnelIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import {
  ProductCard,
  ProductCardSkeleton,
  QuickViewModal,
  usePremiumCart,
  type Product as PremiumProduct,
} from '@/components/premium';
import {
  applyFilters,
  createDefaultFilters,
  shopCatalog,
  SORT_OPTIONS,
  type FilterState,
} from '@/components/shop/catalog';
import { useProductFilters } from '@/components/shop/useProductFilters';
import FiltersSidebar, {
  FiltersSidebarSkeleton,
} from '@/components/shop/FiltersSidebar';
import MobileFiltersDrawer from '@/components/shop/MobileFiltersDrawer';
import ActiveFilterChips from '@/components/shop/ActiveFilterChips';
import ShopToolbar from '@/components/shop/ShopToolbar';

const PRODUCTS_PER_PAGE = 8;

/* ---------------------------------------------------------------------------
 * Page shell — Suspense wraps everything that touches useSearchParams
 * ------------------------------------------------------------------------- */

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopPageSkeleton />}>
      <ShopContent />
    </Suspense>
  );
}

function ShopPageSkeleton() {
  return (
    <div className="w-full bg-white">
      <div className="px-4 py-7 sm:px-8">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-4 h-4 w-40 rounded bg-neutral-100 animate-pulse" />
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="h-8 w-48 rounded-lg bg-neutral-100 animate-pulse" />
            <div className="h-11 w-52 rounded-xl bg-neutral-100 animate-pulse" />
          </div>
          <div className="flex items-start gap-8">
            <FiltersSidebarSkeleton />
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Shop content
 * ------------------------------------------------------------------------- */

function ShopContent() {
  const { addToCart } = usePremiumCart();
  const catalog = shopCatalog;

  const {
    filters,
    priceRange,
    sort,
    results,
    count,
    total,
    isPending,
    activeCount,
    chips,
    setFilterList,
    setPriceRange,
    setSort,
    applyDraftFilters,
    clearAll,
  } = useProductFilters(catalog, 'popular');

  const [selectedProduct, setSelectedProduct] = useState<PremiumProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [draft, setDraft] = useState<FilterState | null>(null);

  // Reset pagination whenever filters or sort change
  useEffect(() => {
    setPage(1);
  }, [filters, sort]);

  const paginatedProducts = results.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE,
  );
  const totalPages = Math.max(1, Math.ceil(results.length / PRODUCTS_PER_PAGE));

  const draftCount = useMemo(
    () => (draft ? applyFilters(catalog, draft).length : 0),
    [catalog, draft],
  );

  /* ---- product card handlers ---- */

  const handleQuickView = (product: PremiumProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (
    product: PremiumProduct,
    size?: string,
    color?: string,
  ) => {
    const colorObj = product.colors.find((c) => c.name === color);
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
      color: colorObj?.name || color || 'Default',
      size: size || 'Default',
    });
  };

  const handleModalAddToCart = (
    product: PremiumProduct,
    size: string,
    color: string,
    quantity: number,
  ) => {
    const colorObj = product.colors.find((c) => c.name === color);
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.images[0],
        color: colorObj?.name || color,
        size,
      });
    }
  };

  const handleWishlistToggle = (productId: string) => {
    setWishlistedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) newSet.delete(productId);
      else newSet.add(productId);
      return newSet;
    });
  };

  /* ---- mobile drawer ---- */

  const openDrawer = () => {
    setDraft({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
    setDrawerOpen(true);
  };

  const handleDraftChange = (patch: Partial<FilterState>) => {
    setDraft((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const handleApplyDraft = () => {
    if (draft) applyDraftFilters(draft);
    setDrawerOpen(false);
  };

  const handleDrawerClearAll = () => {
    setDraft(createDefaultFilters(catalog));
  };

  /* ---- render ---- */

  const countText = `Showing ${count} of ${total} products`;

  return (
    <div className="w-full bg-white">
      <div className="px-4 py-7 sm:px-8">
        <div className="mx-auto max-w-screen-xl">
          <ShopToolbar
            title="Shop"
            countText={countText}
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Shop' },
            ]}
            sortValue={sort}
            sortOptions={SORT_OPTIONS}
            onSortChange={setSort}
            sticky
            leading={
              <button
                type="button"
                onClick={openDrawer}
                className="flex h-11 items-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold text-[var(--ink)] transition-colors duration-150 hover:border-black/20 focus:border-[var(--accent)] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-soft)] lg:hidden"
              >
                <FunnelIcon className="h-4 w-4" />
                Filters
                {activeCount > 0 && (
                  <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--accent)] px-1.5 text-[11px] font-bold tabular-nums text-white">
                    {activeCount}
                  </span>
                )}
              </button>
            }
            chips={
              <ActiveFilterChips
                chips={chips}
                onClearAll={clearAll}
                countText={countText}
              />
            }
          />

          <div className="mt-4 flex items-start gap-8">
            {/* Desktop filters */}
            <FiltersSidebar
              catalog={catalog}
              value={filters}
              onChange={(patch) => {
                if (patch.minPrice !== undefined || patch.maxPrice !== undefined) {
                  setPriceRange([
                    patch.minPrice ?? filters.minPrice,
                    patch.maxPrice ?? filters.maxPrice,
                  ]);
                }
                if (patch.categories) setFilterList('categories', patch.categories);
                if (patch.dressStyles) setFilterList('dressStyles', patch.dressStyles);
                if (patch.colors) setFilterList('colors', patch.colors);
                if (patch.sizes) setFilterList('sizes', patch.sizes);
              }}
              onClearAll={clearAll}
              hasActiveFilters={activeCount > 0}
              onCollapse={() => setSidebarCollapsed(true)}
            />

            {sidebarCollapsed && (
              <div className="hidden lg:block lg:w-[64px] lg:shrink-0">
                <div className="flex flex-col items-center gap-2 rounded-3xl border border-black/5 bg-white p-3 shadow-soft lg:sticky lg:top-24">
                  <button
                    type="button"
                    onClick={() => setSidebarCollapsed(false)}
                    aria-label="Expand filters"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] transition-colors duration-150 hover:bg-[var(--accent)] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                  >
                    <FunnelIcon className="h-5 w-5" />
                  </button>
                  {activeCount > 0 && (
                    <span className="text-[11px] font-bold tabular-nums text-[var(--accent)]">
                      {activeCount}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Product grid */}
            <main className="min-w-0 flex-1">
              {results.length === 0 && !isPending ? (
                <div className="rounded-3xl border border-dashed border-black/10 bg-white px-6 py-16 text-center">
                  <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                    <MagnifyingGlassIcon className="h-7 w-7 text-[var(--accent)]" />
                  </span>
                  <h2 className="font-heading text-lg font-extrabold text-[var(--ink)]">
                    No products match your filters
                  </h2>
                  <p className="mx-auto mt-1 max-w-sm text-sm text-[var(--muted)]">
                    Try removing a filter or widening your price range — there are
                    plenty more styles waiting for you.
                  </p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="mt-6 h-11 rounded-xl bg-[var(--accent)] px-6 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(46,125,50,0.3)] transition-colors duration-150 hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  <div
                    className={`grid grid-cols-1 items-stretch gap-4 transition-opacity duration-200 sm:grid-cols-2 md:gap-6 ${
                      sidebarCollapsed ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                    } ${isPending ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
                    aria-busy={isPending}
                  >
                    {paginatedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={handleQuickView}
                        onAddToCart={handleAddToCart}
                        onWishlistToggle={handleWishlistToggle}
                        isWishlisted={wishlistedItems.has(product.id)}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-10 flex justify-center">
                      <nav className="flex items-center gap-1 sm:gap-2" aria-label="Pagination">
                        <button
                          className="flex items-center gap-1 rounded-lg border border-black/10 px-3 py-2 text-xs text-[var(--ink)] transition-colors duration-150 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:py-2 sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                          disabled={page === 1}
                          onClick={() => setPage((p) => p - 1)}
                        >
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="hidden sm:inline">Previous</span>
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <button
                            key={p}
                            aria-current={page === p ? 'page' : undefined}
                            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs transition-colors duration-150 sm:h-10 sm:w-10 sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${
                              page === p
                                ? 'bg-[var(--accent)] font-semibold text-white shadow-[0_4px_12px_rgba(46,125,50,0.3)]'
                                : 'border border-black/10 text-[var(--ink)] hover:bg-neutral-50'
                            }`}
                            onClick={() => setPage(p)}
                          >
                            {p}
                          </button>
                        ))}

                        <button
                          className="flex items-center gap-1 rounded-lg border border-black/10 px-3 py-2 text-xs text-[var(--ink)] transition-colors duration-150 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:py-2 sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                          disabled={page === totalPages}
                          onClick={() => setPage((p) => p + 1)}
                        >
                          <span className="hidden sm:inline">Next</span>
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Mobile filters drawer — draft state, applies on the footer button */}
      <MobileFiltersDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        catalog={catalog}
        value={draft}
        onChange={handleDraftChange}
        onApply={handleApplyDraft}
        onClearAll={handleDrawerClearAll}
        resultCount={draftCount}
      />

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={handleModalAddToCart}
        />
      )}
    </div>
  );
}
