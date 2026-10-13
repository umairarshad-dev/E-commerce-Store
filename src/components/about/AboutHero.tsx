'use client';

import React from 'react';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';

export default function AboutHero() {
  return (
    <section className="w-full bg-white">
      <div className="px-4 py-12 sm:px-8 md:py-16">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                  Our Story
                </p>
                <h1 className="mt-2 font-heading text-4xl font-extrabold tracking-tight text-[var(--ink)] md:text-5xl">
                  Clothes that feel
                  <br />
                  made for you
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)]">
                  From a single idea in Lahore to a wardrobe loved by thousands — we
                  craft quality fashion that fits real life, real bodies and real budgets.
                </p>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--muted)]">
                  Every piece is picked for comfort, durability and style, so you look
                  good and feel confident wearing it.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-soft">
                <Image
                  src="/images/categories/casual-dress.png"
                  alt="Customers browsing the Shop.co clothing collection"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
