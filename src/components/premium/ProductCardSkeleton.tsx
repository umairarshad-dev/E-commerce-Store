'use client';

import React from 'react';

interface ProductCardSkeletonProps {
  variant?: 'shop' | 'premium';
}

export default function ProductCardSkeleton({ variant = 'shop' }: ProductCardSkeletonProps) {
  if (variant === 'premium') {
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
          {/* Title and Badge */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-3 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Sizes and Colors */}
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

  return (
    <div className="bg-[var(--surface)] rounded-2xl p-3 flex flex-col h-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] animate-pulse">
      <div className="relative w-full aspect-square rounded-xl bg-neutral-100" />
      <div className="flex-1 flex flex-col gap-2 pt-3">
        <div className="h-3 w-14 bg-neutral-100 rounded" />
        <div className="h-4 w-full bg-neutral-100 rounded" />
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-7 h-6 bg-neutral-100 rounded-md" />
          ))}
        </div>
        <div className="h-5 w-20 bg-neutral-100 rounded mt-auto" />
      </div>
    </div>
  );
}
