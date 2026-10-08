'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductCard, QuickViewModal, usePremiumCart, type Product as PremiumProduct } from '@/components/premium';

interface LegacyProduct {
  id: number;
  name: string;
  salePrice?: number;
  currentPrice: number;
  price?: number;
  originalPrice?: number;
  images?: string[];
  image: string;
  colors?: { name: string; code: string }[];
  sizes?: string[];
}

interface RelatedProductsProps {
  products: LegacyProduct[];
}

function toPremium(product: LegacyProduct): PremiumProduct {
  return {
    id:           product.id.toString(),
    slug:         product.name.toLowerCase().replace(/\s+/g, '-'),
    title:        product.name,
    category:     'CLOTHING',
    price:        product.salePrice ?? product.currentPrice,
    compareAtPrice: (product.price ?? product.originalPrice),
    images:       product.images?.length ? product.images : [product.image],
    colors:       product.colors?.map((c) => ({ name: c.name, hex: c.code })) ?? [{ name: 'Default', hex: '#000' }],
    sizes:        product.sizes?.map((s) => ({ label: s, inStock: true })) ?? [{ label: 'M', inStock: true }],
  };
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const { addToCart } = usePremiumCart();
  const [selectedProduct, setSelectedProduct] = useState<PremiumProduct | null>(null);
  const [modalOpen, setModalOpen]             = useState(false);
  const [wishlisted, setWishlisted]           = useState<Set<string>>(new Set());

  const premiumProducts = products.map(toPremium);

  const handleWishlistToggle = (id: string) => {
    setWishlisted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAddToCart = (product: PremiumProduct, size?: string, color?: string) => {
    addToCart({
      id:    product.id,
      name:  product.title,
      price: product.price,
      image: product.images[0],
      color: color ?? product.colors[0]?.name ?? 'Default',
      size:  size  ?? product.sizes[0]?.label ?? 'M',
    });
  };

  const handleModalAddToCart = (product: PremiumProduct, size: string, color: string, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ id: product.id, name: product.title, price: product.price, image: product.images[0], color, size });
    }
  };

  return (
    <section aria-labelledby="related-heading">
      <div className="flex items-center justify-between mb-5">
        <h2 id="related-heading" className="text-xl font-bold text-[var(--ink)]">
          You might also like
        </h2>
        <Link
          href="/"
          className="text-sm font-semibold text-[var(--accent)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 rounded"
        >
          View all →
        </Link>
      </div>

      {/* Desktop: 4-column grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
        {premiumProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => { setSelectedProduct(p); setModalOpen(true); }}
            onAddToCart={handleAddToCart}
            onWishlistToggle={handleWishlistToggle}
            isWishlisted={wishlisted.has(product.id)}
          />
        ))}
      </div>

      {/* Mobile: horizontal scroll-snap showing 2.2 cards */}
      <div className="flex md:hidden gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-2">
        {premiumProducts.map((product) => (
          <div key={product.id} className="snap-start flex-shrink-0 w-[calc(45vw+8px)] min-w-[170px]">
            <ProductCard
              product={product}
              onQuickView={(p) => { setSelectedProduct(p); setModalOpen(true); }}
              onAddToCart={handleAddToCart}
              onWishlistToggle={handleWishlistToggle}
              isWishlisted={wishlisted.has(product.id)}
            />
          </div>
        ))}
      </div>

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAddToCart={handleModalAddToCart}
        />
      )}
    </section>
  );
}
