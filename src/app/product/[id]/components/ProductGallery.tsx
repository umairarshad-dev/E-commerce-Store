'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
  discount?: number;
  isWishlisted?: boolean;
  onWishlistToggle?: () => void;
}

export default function ProductGallery({
  images,
  productName,
  badge,
  discount,
  isWishlisted = false,
  onWishlistToggle,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const mainImageRef = useRef<HTMLDivElement>(null);

  const allImages = images.length > 0 ? images : ['/images/ecommerce-assets/shirt01.png'];

  /* ── zoom on hover ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, []);

  /* ── lightbox keyboard ── */
  const handleLightboxKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % allImages.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length);
    },
    [allImages.length],
  );

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* ── Gallery: main image on top, thumbnails below ── */}
      <div className="flex flex-col gap-3 w-full">

        {/* Main image */}
        <div
          ref={mainImageRef}
          className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-100 cursor-zoom-in select-none"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={handleMouseMove}
          onClick={() => openLightbox(activeIndex)}
        >
          {allImages.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={idx === activeIndex ? productName : `${productName} view ${idx + 1}`}
              fill
              priority={idx === 0}
              className={`object-contain p-6 transition-opacity duration-200 ${activeIndex === idx ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 1024px) 100vw, 55vw"
              style={
                zoom && activeIndex === idx
                  ? {
                      transform: 'scale(1.6)',
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transition: 'transform 0ms',
                    }
                  : { transform: 'scale(1)', transition: 'transform 200ms' }
              }
            />
          ))}

          {/* Badges top-left */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
            {badge === 'NEW' && (
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[var(--ink)] text-white rounded-full">
                New
              </span>
            )}
            {discount && discount > 0 && (
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist + Share top-right */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); onWishlistToggle?.(); }}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={isWishlisted}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
            >
              <svg
                className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
                fill={isWishlisted ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigator.share?.({ url: window.location.href }).catch(() => {});
              }}
              aria-label="Share product"
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Thumbnail strip — horizontal, below main image on all screen sizes */}
        {allImages.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-1">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`View image ${idx + 1}`}
                aria-pressed={activeIndex === idx}
                className={`
                  relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 snap-start transition-all duration-150
                  focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
                  ${activeIndex === idx
                    ? 'ring-2 ring-[var(--accent)] ring-offset-1'
                    : 'ring-1 ring-gray-200 opacity-60 hover:opacity-100 hover:ring-[var(--accent)]'}
                `}
              >
                <Image src={img} alt={`${productName} thumbnail ${idx + 1}`} fill className="object-contain p-1.5" sizes="64px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onKeyDown={handleLightboxKey}
          tabIndex={-1}
          ref={(el) => el?.focus()}
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative w-full max-w-3xl aspect-[4/5] mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={allImages[lightboxIndex]}
              alt={`${productName} lightbox ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          {/* Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length); }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i + 1) % allImages.length); }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}
          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm tabular-nums">{lightboxIndex + 1} / {allImages.length}</p>
        </div>
      )}
    </>
  );
}
