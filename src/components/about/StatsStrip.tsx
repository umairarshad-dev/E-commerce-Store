'use client';

import React, { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/ui/Reveal';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const STATS: Stat[] = [
  { value: 200, suffix: '+', label: 'Brands' },
  { value: 2000, suffix: '+', label: 'Products' },
  { value: 30000, suffix: '+', label: 'Happy Customers' },
  { value: 4.9, suffix: '', label: 'Rating', decimals: 1 },
];

function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setDisplay(stat.value);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(stat.value * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [stat.value]);

  const formatted =
    stat.decimals != null
      ? display.toFixed(stat.decimals)
      : Math.round(display).toLocaleString('en-US');

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {stat.suffix}
    </span>
  );
}

export default function StatsStrip() {
  return (
    <section className="w-full bg-white">
      <div className="px-4 pb-12 sm:px-8">
        <Reveal>
          <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-4 rounded-3xl border border-black/5 bg-[var(--page)] p-6 md:grid-cols-4 md:p-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl font-extrabold text-[var(--ink)] md:text-4xl">
                  <CountUp stat={stat} />
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
