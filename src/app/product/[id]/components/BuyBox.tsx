'use client';

import React, { useState } from 'react';
import ColorSelector, { type ColorOption } from './ColorSelector';
import SizeSelector, { type SizeOption } from './SizeSelector';

interface BuyBoxProps {
  product: {
    id: number;
    name: string;
    brand?: string;
    category?: string;
    description?: string;
    currentPrice: number;
    originalPrice?: number;
    salePrice?: number;
    price?: number;
    discount?: number;
    rating: number;
    reviews: number;
    colors?: ColorOption[];
    sizes?: SizeOption[];
    stock?: number;
    sku?: string;
  };
  onAddToCart: (size: string, color: string, quantity: number) => void;
  onBuyNow?: (size: string, color: string, quantity: number) => void;
}

function StarRow({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-[var(--muted)] tabular-nums">{rating.toFixed(1)}</span>
      <span className="text-sm text-[var(--accent)] font-medium hover:underline cursor-pointer">
        ({count} reviews)
      </span>
    </div>
  );
}

const formatPrice = (price: number) =>
  `Rs ${price.toLocaleString('en-PK')}`;

export default function BuyBox({ product, onAddToCart, onBuyNow }: BuyBoxProps) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize]   = useState('');
  const [quantity, setQuantity]           = useState(1);
  const [addState, setAddState]           = useState<'idle' | 'adding' | 'added'>('idle');

  const salePrice     = product.salePrice ?? product.currentPrice;
  const originalPrice = product.originalPrice ?? product.price;
  const discount      = product.discount ?? (originalPrice && originalPrice > salePrice
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0);

  const colors: ColorOption[] = (product.colors ?? []).map((c) => ({
    name:    c.name,
    code:    c.code,
    inStock: true,
  }));

  const sizes: SizeOption[] = (product.sizes ?? []).map((s) => ({
    label:   typeof s === 'string' ? s : (s as SizeOption).label,
    inStock: typeof s === 'string' ? true : (s as SizeOption).inStock !== false,
    stock:   product.stock,
  }));

  const isReady     = selectedSize !== '' && (colors.length === 0 || selectedColor !== '');
  const buttonLabel = !isReady
    ? 'Select a size'
    : addState === 'adding'
    ? 'Adding…'
    : addState === 'added'
    ? 'Added ✓'
    : 'Add to Cart';

  const handleAddToCart = () => {
    if (!isReady || addState !== 'idle') return;
    setAddState('adding');
    onAddToCart(selectedSize, selectedColor || colors[0]?.name || '', quantity);
    setTimeout(() => {
      setAddState('added');
      setTimeout(() => setAddState('idle'), 2000);
    }, 600);
  };

  const handleBuyNow = () => {
    if (!isReady) return;
    onBuyNow?.(selectedSize, selectedColor || colors[0]?.name || '', quantity);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Category + Rating */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          {product.brand ?? 'Clothing'} · {product.category ?? 'Apparel'}
        </span>
        <StarRow rating={product.rating} count={product.reviews} />
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)] leading-tight tracking-tight">
        {product.name}
      </h1>

      {/* Price row */}
      <div className="flex items-center flex-wrap gap-3">
        <span className="text-3xl font-bold text-[var(--accent)] tabular-nums">
          {formatPrice(salePrice)}
        </span>
        {originalPrice && originalPrice > salePrice && (
          <span className="text-lg text-[var(--muted)] line-through tabular-nums">
            {formatPrice(originalPrice)}
          </span>
        )}
        {discount > 0 && (
          <span className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Short description */}
      {product.description && (
        <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2">
          {product.description}
        </p>
      )}

      <div className="h-px bg-gray-100" />

      {/* Color */}
      {colors.length > 0 && (
        <ColorSelector
          colors={colors}
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      )}

      {/* Size */}
      {sizes.length > 0 && (
        <SizeSelector
          sizes={sizes}
          selectedSize={selectedSize}
          onSelect={setSelectedSize}
        />
      )}

      {/* Quantity + Add to Cart */}
      <div className="flex items-center gap-3">
        {/* Stepper */}
        <div className="inline-flex items-center bg-gray-100 rounded-2xl overflow-hidden h-14 flex-shrink-0">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="w-11 h-full flex items-center justify-center text-[var(--ink)] hover:text-[var(--accent)] disabled:opacity-40 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent)]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-10 text-center text-sm font-bold text-[var(--ink)] tabular-nums select-none">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="w-11 h-full flex items-center justify-center text-[var(--ink)] hover:text-[var(--accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent)]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!isReady || addState !== 'idle'}
          aria-label={buttonLabel}
          className={`
            flex-1 h-14 rounded-2xl font-bold text-sm flex items-center justify-center gap-2
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
            ${isReady && addState === 'idle'
              ? 'bg-[var(--accent)] text-white hover:opacity-90 shadow-[0_4px_14px_rgba(46,125,50,0.35)] hover:shadow-[0_6px_20px_rgba(46,125,50,0.45)]'
              : addState === 'added'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
          `}
        >
          {addState === 'adding' ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : addState === 'added' ? null : (
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          )}
          {buttonLabel}
        </button>
      </div>

      {/* Buy now */}
      <button
        onClick={handleBuyNow}
        disabled={!isReady}
        aria-label="Buy it now"
        className={`
          w-full h-12 rounded-2xl font-bold text-sm border-2 transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
          ${isReady
            ? 'border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-soft)]'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'}
        `}
      >
        Buy it now
      </button>

      {/* Trust row */}
      <div className="border border-gray-100 rounded-2xl p-4 grid grid-cols-3 gap-3">
        {[
          {
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            ),
            label: 'Free delivery',
            sub: 'Orders over Rs 5,000',
          },
          {
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ),
            label: '7-day returns',
            sub: 'Easy & free',
          },
          {
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            ),
            label: 'Cash on delivery',
            sub: 'Nationwide',
          },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center text-center gap-1.5">
            <span className="text-[var(--accent)]">{item.icon}</span>
            <span className="text-[11px] font-semibold text-[var(--ink)] leading-tight">{item.label}</span>
            <span className="text-[10px] text-[var(--muted)] leading-tight">{item.sub}</span>
          </div>
        ))}
      </div>


    </div>
  );
}
