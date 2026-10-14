'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Review } from '@/data/reviews';

function GoldStars({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-amber-400' : 'text-neutral-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/** inline SVG verified check — replaces the broken /verified-tick.png image */
function VerifiedCheck() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-black"
      viewBox="0 0 20 20"
      fill="currentColor"
      role="img"
      aria-label="Verified buyer"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.58l-1.3-1.3a1 1 0 00-1.4 1.42l2 2a1 1 0 001.4 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Avatar({ review }: { review: Review }) {
  const [failed, setFailed] = useState(false);
  const initials = review.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (review.avatarUrl && !failed) {
    return (
      <Image
        src={review.avatarUrl}
        alt={review.name}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold text-black"
    >
      {initials}
    </span>
  );
}

export default function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > 180;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
      <div className="flex items-start justify-between gap-3">
        <GoldStars rating={review.rating} />
        <svg
          className="h-8 w-8 shrink-0 text-black/5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M7.17 6A5.17 5.17 0 002 11.17V18h6.5v-6.83H5.3c.06-2.2 1.24-3.37 3.4-3.4V6H7.17zm9.66 0A5.17 5.17 0 0011.66 11.17V18h6.5v-6.83h-3.2c.06-2.2 1.24-3.37 3.4-3.4V6h-1.53z" />
        </svg>
      </div>

      <p
        className={`mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base ${
          expanded ? '' : 'line-clamp-4'
        }`}
      >
        {review.text}
      </p>
      {long && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 self-start text-xs font-semibold text-black transition-colors hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}

      <div className="mt-4 border-t border-black/5 pt-4" />

      <div className="mt-4 flex items-center gap-3">
        <Avatar review={review} />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-bold text-[var(--ink)]">{review.name}</span>
            <VerifiedCheck />
          </div>
          <span className="text-xs text-[var(--muted)]">Verified buyer</span>
        </div>
      </div>

      <p className="mt-3 text-xs text-[var(--muted)]">
        Purchased: {review.product} · {review.date}
      </p>
    </article>
  );
}
