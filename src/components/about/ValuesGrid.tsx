'use client';

import React from 'react';
import {
  CheckBadgeIcon,
  HeartIcon,
  LightBulbIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import Reveal from '@/components/ui/Reveal';

const VALUES = [
  {
    icon: CheckBadgeIcon,
    title: 'Quality',
    description: 'Premium fabrics and stitching we would wear ourselves.',
  },
  {
    icon: HeartIcon,
    title: 'Customer Satisfaction',
    description: 'Easy exchanges and real humans when you need help.',
  },
  {
    icon: LightBulbIcon,
    title: 'Innovation',
    description: 'Fresh drops every week, always on-trend.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Integrity',
    description: 'Honest pricing, transparent policies, no surprises.',
  },
];

export default function ValuesGrid() {
  return (
    <section className="w-full bg-white">
      <div className="px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-screen-xl">
          <Reveal>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-[var(--ink)] md:text-3xl">
              Our Values
            </h2>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                    <value.icon className="h-6 w-6 text-[var(--accent)]" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold text-[var(--ink)]">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
