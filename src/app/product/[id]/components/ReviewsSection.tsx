'use client';

import React, { useState } from 'react';

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  helpful?: number;
  size?: string;
  verified?: boolean;
}

interface ReviewsSectionProps {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

function Stars({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`${sz} ${s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const STAR_DIST: Record<number, number> = { 5: 72, 4: 16, 3: 7, 2: 3, 1: 2 };

export default function ReviewsSection({ averageRating, totalReviews, reviews }: ReviewsSectionProps) {
  const [writeOpen, setWriteOpen] = useState(false);
  const [newRating, setNewRating]   = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <section aria-labelledby="reviews-heading">
      <div className="flex items-center justify-between mb-8">
        <h2 id="reviews-heading" className="text-xl font-bold text-[var(--ink)]">
          Customer Reviews
        </h2>
        <button
          onClick={() => setWriteOpen(true)}
          className="px-4 py-2 rounded-xl border-2 border-[var(--accent)] text-[var(--accent)] text-sm font-bold hover:bg-[var(--accent-soft)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
        >
          Write a review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-12">
        {/* Rating summary */}
        <div className="flex flex-col items-start gap-4">
          <div>
            <p className="text-5xl font-extrabold text-[var(--ink)] tabular-nums">{averageRating.toFixed(1)}</p>
            <Stars rating={averageRating} size="md" />
            <p className="text-xs text-[var(--muted)] mt-1">{totalReviews} reviews</p>
          </div>
          {/* Bar chart */}
          <div className="w-full flex flex-col gap-1.5">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-[var(--muted)] w-2 tabular-nums">{star}</span>
                <svg className="w-3 h-3 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${STAR_DIST[star] ?? 0}%` }}
                    role="progressbar"
                    aria-valuenow={STAR_DIST[star] ?? 0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${star} star: ${STAR_DIST[star]}%`}
                  />
                </div>
                <span className="text-xs text-[var(--muted)] w-7 tabular-nums">{STAR_DIST[star]}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review list */}
        <div className="flex flex-col gap-5">
          {reviews.map((review) => (
            <article key={review.id} className="bg-[var(--page)] rounded-2xl p-5 space-y-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-sm font-bold text-[var(--ink)]">{review.user}</p>
                  <p className="text-[11px] text-[var(--muted)]">{review.date}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Stars rating={review.rating} size="sm" />
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--accent-soft)] text-[var(--accent)] text-[10px] font-bold rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified Buyer
                      </span>
                    )}
                    {review.size && (
                      <span className="px-2 py-0.5 bg-gray-100 text-[var(--muted)] text-[10px] font-medium rounded-full">
                        Size: {review.size}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{review.comment}</p>
              {review.helpful !== undefined && (
                <p className="text-[11px] text-[var(--muted)]">
                  {review.helpful} people found this helpful
                </p>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Write review modal */}
      {writeOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="write-review-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setWriteOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 id="write-review-title" className="text-base font-bold text-[var(--ink)]">Write a Review</h3>
              <button onClick={() => setWriteOpen(false)} aria-label="Close" className="p-1.5 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
                <svg className="w-5 h-5 text-[var(--ink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setWriteOpen(false); }} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-2 block">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(s)}
                      aria-label={`Rate ${s} star${s > 1 ? 's' : ''}`}
                      className="focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded"
                    >
                      <svg className={`w-7 h-7 transition-colors ${s <= (hoverRating || newRating) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="review-text" className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-2 block">Your Review</label>
                <textarea
                  id="review-text"
                  rows={4}
                  placeholder="Share your experience with this product…"
                  required
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-[var(--ink)] placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[var(--accent)] text-white text-sm font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
