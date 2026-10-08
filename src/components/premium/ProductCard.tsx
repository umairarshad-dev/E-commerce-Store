'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SizeChips from './SizeChips';
import ColorSwatches from './ColorSwatches';

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: string;
  fabric?: string;
  price: number;
  compareAtPrice?: number;
  badge?: 'NEW' | 'SALE' | 'BEST SELLER';
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: { label: string; inStock: boolean }[];
};

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product, size?: string, color?: string) => void;
  onWishlistToggle?: (productId: string) => void;
  isWishlisted?: boolean;
  className?: string;
}

export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
  onWishlistToggle,
  isWishlisted = false,
  className = '',
}: ProductCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find((s) => s.inStock)?.label || ''
  );
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');

  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product, selectedSize, selectedColor);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onWishlistToggle) {
      onWishlistToggle(product.id);
    }
  };

  const formatPrice = (price: number) => {
    return `Rs ${price.toLocaleString()}`;
  };

  return (
    <div
      className={`
        bg-[var(--surface)] rounded-2xl p-3 flex flex-col h-full
        shadow-[0_2px_8px_rgba(0,0,0,0.08)]
        hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]
        hover:-translate-y-1
        transition-all duration-200 ease-out
        cursor-pointer
        ${className}
      `}
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) {
          setCurrentImageIndex(1);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View details for ${product.title}`}
    >
      {/* Image Area */}
      <div className="relative w-full aspect-square md:aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 p-3">
        {/* Category Pill */}
        <div className="absolute top-2 left-2 z-10">
          <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-sm rounded-full">
            {product.category}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`
            absolute top-2 right-2 z-10 w-8 h-8 rounded-full
            bg-white shadow-md flex items-center justify-center
            transition-all duration-200
            ${isWishlisted ? 'scale-110' : 'hover:scale-110'}
            focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
          `}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
        >
          <svg
            className={`w-4 h-4 transition-colors duration-200 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Product Images */}
        <div className="relative w-full h-full">
          {product.images.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt={`${product.title} - view ${index + 1}`}
              fill
              className={`
                object-contain transition-opacity duration-300
                ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}
              `}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index === 0}
            />
          ))}
        </div>

        {/* Quick View Overlay - Desktop */}
        <button
          onClick={handleQuickView}
          className={`
            absolute bottom-0 left-0 right-0
            bg-white/80 backdrop-blur-sm
            py-2 text-center
            transition-transform duration-300 ease-out
            ${isHovered ? 'translate-y-0' : 'translate-y-full'}
            lg:block hidden
            focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
          `}
          aria-label="Quick view"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
            Quick View
          </span>
        </button>

        {/* Quick View Button - Mobile */}
        <div className="lg:hidden absolute bottom-2 right-2 z-10">
          <button
            onClick={handleQuickView}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center"
            aria-label="Quick view"
          >
            <svg className="w-4 h-4 text-[var(--ink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info Area */}
      <div className="flex-1 flex flex-col gap-2 pt-2 mt-auto">
        {/* Title */}
        <h3 className="text-sm font-semibold text-[var(--ink)] truncate">
          {product.title}
        </h3>

        {/* Size Chips */}
        {product.sizes.length > 0 && (
          <SizeChips
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
            maxDisplay={4}
          />
        )}

        {/* Color Swatches */}
        {product.colors.length > 0 && (
          <ColorSwatches
            colors={product.colors}
            selectedColor={selectedColor}
            onSelect={setSelectedColor}
            maxDisplay={4}
          />
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[var(--accent)] tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-xs text-[var(--muted)] line-through tabular-nums">
                  {formatPrice(product.compareAtPrice)}
                </span>
                {discountPercentage && (
                  <span className="text-[10px] font-bold text-red-600">
                    -{discountPercentage}%
                  </span>
                )}
              </>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`
              w-8 h-8 rounded-lg flex items-center justify-center
              transition-all duration-200
              bg-[var(--accent-soft)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white
              focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
            `}
            aria-label="Add to cart"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
