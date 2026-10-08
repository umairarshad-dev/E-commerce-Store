'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import SizeChips from './SizeChips';
import ColorSwatches from './ColorSwatches';
import QuantityStepper from './QuantityStepper';
import type { Product } from './ProductCard';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, size: string, color: string, quantity: number) => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const isFormValid = selectedSize && selectedColor;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    if (!isFormValid || isAdding) return;

    setIsAdding(true);
    if (onAddToCart) {
      onAddToCart(product, selectedSize, selectedColor, quantity);
    }

    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 1500);
  };

  const formatPrice = (price: number) => {
    return `Rs ${price.toLocaleString()}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      <div
        ref={modalRef}
        className={`
          bg-[var(--surface)] rounded-[32px] max-w-4xl w-full max-h-[85vh] overflow-y-auto
          transform transition-all duration-300 ease-out no-scrollbar
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[var(--surface)] z-10 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Quick View
          </span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 h-6 text-[var(--ink)]" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Left Column - Images */}
            <div className="space-y-3">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                {product.images.map((image, index) => (
                  <Image
                    key={image}
                    src={image}
                    alt={`${product.title} - view ${index + 1}`}
                    fill
                    className={`
                      object-contain transition-opacity duration-300
                      ${selectedImageIndex === index ? 'opacity-100' : 'opacity-0'}
                    `}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ))}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((image, index) => (
                    <button
                      key={image}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`
                        relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0
                        border-2 transition-all duration-200
                        ${selectedImageIndex === index
                          ? 'border-[var(--accent)]'
                          : 'border-transparent hover:border-gray-300'
                        }
                        focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
                      `}
                      aria-label={`View image ${index + 1}`}
                      aria-pressed={selectedImageIndex === index}
                    >
                      <Image
                        src={image}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-4">
              {/* Category Label */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                {product.category} · {product.fabric || 'COTTON'}
              </p>

              {/* Title */}
              <h2
                id="quick-view-title"
                className="font-extrabold text-xl md:text-2xl text-[var(--ink)] leading-tight"
              >
                {product.title}
              </h2>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-[var(--accent)] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-sm text-[var(--muted)] line-through tabular-nums">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                    {discountPercentage && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-600 rounded-full">
                        -{discountPercentage}%
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                      Color
                    </p>
                    <span className="text-[10px] font-medium text-[var(--ink)]">
                      {product.colors.find((c) => c.name === selectedColor)?.name}
                    </span>
                  </div>
                  <ColorSwatches
                    colors={product.colors}
                    selectedColor={selectedColor}
                    onSelect={setSelectedColor}
                    maxDisplay={6}
                    showSelectedName={false}
                  />
                </div>
              )}

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                      Size
                    </p>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-[10px] font-medium text-[var(--accent)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                    >
                      Size Guide
                    </button>
                  </div>
                  <SizeChips
                    sizes={product.sizes}
                    selectedSize={selectedSize}
                    onSelect={setSelectedSize}
                    maxDisplay={6}
                  />

                  {/* Size Guide Popover */}
                  {showSizeGuide && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <table className="w-full text-[10px]">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="py-1.5 text-left font-semibold text-[var(--ink)]">Size</th>
                            <th className="py-1.5 text-center font-semibold text-[var(--ink)]">Chest (in)</th>
                            <th className="py-1.5 text-center font-semibold text-[var(--ink)]">Length (in)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.sizes.map((size) => (
                            <tr key={size.label} className="border-b border-gray-100 last:border-0">
                              <td className="py-1.5 font-medium text-[var(--ink)]">{size.label}</td>
                              <td className="py-1.5 text-center text-[var(--muted)]">
                                {size.label === 'XS' ? '34-36' : size.label === 'S' ? '36-38' : size.label === 'M' ? '38-40' : size.label === 'L' ? '40-42' : size.label === 'XL' ? '42-44' : size.label === 'XXL' ? '44-46' : '44-46'}
                              </td>
                              <td className="py-1.5 text-center text-[var(--muted)]">
                                {size.label === 'XS' ? '26' : size.label === 'S' ? '27' : size.label === 'M' ? '28' : size.label === 'L' ? '29' : size.label === 'XL' ? '30' : size.label === 'XXL' ? '31' : '31'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                  Quantity
                </p>
                <QuantityStepper
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  min={1}
                  max={10}
                />
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!isFormValid || isAdding}
                className={`
                  w-full py-3 px-4 rounded-xl font-bold text-base
                  flex items-center justify-center gap-2
                  transition-all duration-200
                  ${isFormValid && !isAdding
                    ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                  focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
                `}
              >
                {isAdding ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Adding...
                  </>
                ) : !isFormValid ? (
                  'Select Required Options'
                ) : (
                  <>
                    Add to Cart
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </>
                )}
              </button>

              {/* Trust Row */}
              <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span className="text-[10px] text-[var(--muted)]">Free Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-[10px] text-[var(--muted)]">Easy Returns</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-[10px] text-[var(--muted)]">Cash on Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
