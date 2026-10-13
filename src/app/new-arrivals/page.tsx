'use client';

import React, { Suspense, useState } from 'react';
import {
  ProductCard,
  ProductCardSkeleton,
  QuickViewModal,
  usePremiumCart,
  type Product as PremiumProduct,
} from '@/components/premium';
import { newArrivalsCatalog, SORT_OPTIONS } from '@/components/shop/catalog';
import { useProductFilters } from '@/components/shop/useProductFilters';
import ShopToolbar, {
  ViewToggle,
  type ViewMode,
} from '@/components/shop/ShopToolbar';

export default function NewArrivalsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-screen-xl px-4 py-7 sm:px-8">
          <div className="mb-4 h-4 w-48 rounded bg-neutral-100 animate-pulse" />
          <div className="mb-6 h-9 w-64 rounded-lg bg-neutral-100 animate-pulse" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <NewArrivalsContent />
    </Suspense>
  );
}

function NewArrivalsContent() {
  const { addToCart } = usePremiumCart();
  const catalog = newArrivalsCatalog;

  const { results, count, total, isPending, sort, setSort } =
    useProductFilters(catalog, 'newest');

  const [view, setView] = useState<ViewMode>('grid');
  const [selectedProduct, setSelectedProduct] = useState<PremiumProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());

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

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-7 sm:px-8">
        <div className="mx-auto max-w-screen-xl">
          <ShopToolbar
            title="New Arrivals"
            countText={
              count === total
                ? `Showing ${count} products`
                : `Showing ${count} of ${total} products`
            }
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'New Arrivals' },
            ]}
            sortValue={sort}
            sortOptions={SORT_OPTIONS}
            onSortChange={setSort}
            sticky
            trailing={<ViewToggle view={view} onChange={setView} />}
          />

          <p className="mb-6 text-sm text-[var(--muted)]">
            Check out our latest collection of fresh styles!
          </p>

          <div
            className={`grid items-stretch gap-4 transition-opacity duration-200 md:gap-6 ${
              view === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 md:grid-cols-2'
            } ${isPending ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
            aria-busy={isPending}
          >
            {results.map((product) => (
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

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="h-[52px] rounded-full border-2 border-[var(--accent)] px-10 text-base font-semibold text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
            >
              View All
            </button>
          </div>
        </div>
      </div>

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
