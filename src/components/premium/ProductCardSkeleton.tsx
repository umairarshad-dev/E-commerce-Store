'use client';

import React from 'react';

export default function ProductCardSkeleton() {
  return (
    <div className="bg-[var(--surface)] rounded-2xl p-3 flex flex-col h-full shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      {/* Image Skeleton */}
      <div className="relative w-full aspect-square md:aspect-[4/5] rounded-xl bg-neutral-100 p-3 animate-pulse">
        {/* Category Pill and Badge Skeleton */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          <div className="w-16 h-4 bg-gray-300 rounded-full animate-pulse" />
          <div className="w-12 h-4 bg-gray-300 rounded-full animate-pulse" />
        </div>
        {/* Wishlist Button Skeleton */}
        <div className="absolute top-2 right-2 w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
      </div>

      {/* Info Skeleton */}
      <div className="flex-1 flex flex-col gap-2 pt-2 mt-auto">
        {/* Title and Badge Skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Sizes and Colors Skeleton */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1.5 flex-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-7 h-6 bg-gray-200 rounded-md animate-pulse" />
            ))}
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-[14px] h-[14px] bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between mt-auto">
          <div className="w-16 h-5 bg-gray-200 rounded animate-pulse" />
          <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
