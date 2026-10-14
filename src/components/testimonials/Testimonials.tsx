'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/outline';
import ReviewCard from './ReviewCard';
import Reveal from '@/components/ui/Reveal';
import { REVIEWS, REVIEW_STATS } from '@/data/reviews';

/**
 * "Our Happy Customers" carousel: scroll-snap track (3 cards on desktop,
 * ~1.1 cards on mobile so the next card peeks), arrow buttons that disable
 * at the ends, arrow-key + swipe support, and mobile pagination dots.
 */
export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(REVIEWS.length - 1);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    if (!card) return;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
    const perView = Math.max(1, Math.round((track.clientWidth + gap) / (card.clientWidth + gap)));
    setMaxIndex(Math.max(0, REVIEWS.length - perView));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('[data-card]');
    if (!track || !card) return;
    const clamped = Math.max(0, i);
    setIndex(clamped);
    track.scrollTo({ left: clamped * (card.clientWidth + 16), behavior: 'smooth' });
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollToIndex(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollToIndex(index + 1);
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-screen-xl">
          <Reveal>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                  Testimonials
                </p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--ink)] md:text-3xl">
                  Our Happy Customers
                </h2>
                <div className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]">
                  <span className="flex gap-0.5" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <StarIcon key={i} className="h-4 w-4 text-amber-400" fill="currentColor" />
                    ))}
                  </span>
                  <span className="tabular-nums">
                    <span className="font-bold text-[var(--ink)]">{REVIEW_STATS.rating}</span> / 5 ·{' '}
                    {REVIEW_STATS.totalLabel} verified reviews
                  </span>
                </div>
              </div>

              <div className="hidden gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => scrollToIndex(index - 1)}
                  disabled={index === 0}
                  aria-label="Previous reviews"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[var(--ink)] transition-colors duration-150 hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-black/10 disabled:hover:bg-white disabled:hover:text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToIndex(index + 1)}
                  disabled={index >= maxIndex}
                  aria-label="Next reviews"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[var(--ink)] transition-colors duration-150 hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-black/10 disabled:hover:bg-white disabled:hover:text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Reveal>

          <div
            ref={trackRef}
            role="region"
            aria-label="Customer reviews carousel"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="thin-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{
              // 1 card + a peek on mobile, 2 on sm, 3 on lg
              maskImage: undefined,
            }}
          >
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                data-card
                className="w-[86%] shrink-0 snap-start sm:w-[60%] lg:w-[calc((100%-2rem)/3)]"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          {/* Mobile pagination dots */}
          <div className="mt-4 flex justify-center gap-1.5 sm:hidden">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-200 ${
                  i === index ? 'w-5 bg-black' : 'w-2 bg-neutral-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
