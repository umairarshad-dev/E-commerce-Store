'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/lib/context/CartContext';
import type { Product } from '@/components/lib/data/products';

import ProductGallery  from './components/ProductGallery';
import BuyBox          from './components/BuyBox';
import ProductTabs     from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import StickyMobileBar from './components/StickyMobileBar';

interface Props {
  product:         Product;
  relatedProducts: Product[];
}

export default function PDPClient({ product, relatedProducts }: Props) {
  const { addToCart } = useCart();

  // Shared selection state — BuyBox writes, StickyMobileBar reads
  const [lastSize,  setLastSize]  = useState('');
  const [lastColor, setLastColor] = useState('');
  const [lastQty,   setLastQty]   = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sentinel element observed by StickyMobileBar
  const sentinelRef = useRef<HTMLSpanElement>(null);

  const salePrice = product.salePrice ?? product.currentPrice;

  const handleAddToCart = (size: string, color: string, quantity: number) => {
    setLastSize(size);
    setLastColor(color);
    setLastQty(quantity);
    addToCart({
      id:    product.id.toString(),
      name:  product.name,
      price: salePrice,
      image: product.images?.[0] ?? product.image,
      color: color || product.colors?.[0]?.name || 'Default',
      size,
    });
  };

  const handleStickyAdd = () => {
    if (!lastSize) return;
    handleAddToCart(lastSize, lastColor, lastQty);
  };

  const crumbs = [
    { label: 'Home',     href: '/' },
    { label: 'Men',      href: '/' },
    { label: 'T-Shirts', href: '/' },
    { label: product.name },
  ];

  return (
    <div className="bg-[var(--page)] min-h-screen pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-16">

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-[var(--muted)]">
            {crumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-1">
                {idx > 0 && <span aria-hidden="true" className="text-gray-300">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-[var(--accent)] transition-colors focus:outline-none focus:underline"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[var(--ink)] font-medium truncate max-w-[160px]" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Main two-column grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* Gallery — ~55% */}
          <div className="w-full lg:w-[55%]">
            <ProductGallery
              images={product.images ?? [product.image]}
              productName={product.name}
              badge={product.discount ? undefined : 'NEW'}
              discount={product.discount}
              isWishlisted={isWishlisted}
              onWishlistToggle={() => setIsWishlisted((w) => !w)}
            />
          </div>

          {/* Buy box — ~45%, sticky on desktop */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-24 self-start">
            {/* Sentinel: StickyMobileBar watches this to know when buy box leaves viewport */}
            <span ref={sentinelRef} aria-hidden="true" />
            <div className="bg-white rounded-3xl shadow-[0_2px_16px_rgba(0,0,0,0.07)] p-6 md:p-8">
              <BuyBox
                product={{
                  ...product,
                  category: product.brand ?? 'Clothing',
                  sku:      `PROD-${product.id}`,
                  colors:   product.colors?.map((c) => ({ name: c.name, code: c.code, inStock: true })),
                  sizes:    product.sizes?.map((s) => ({ label: s, inStock: true, stock: product.stock })),
                }}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>

        {/* Product info tabs / accordion */}
        <div className="mt-14 bg-white rounded-3xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-6 md:p-10">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        <div className="mt-14">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>

      {/* Fixed bottom bar on mobile — visible once buy box scrolls away */}
      <StickyMobileBar
        price={salePrice}
        isReady={lastSize !== ''}
        onAddToCart={handleStickyAdd}
        mainButtonRef={sentinelRef as React.RefObject<HTMLElement>}
      />
    </div>
  );
}
