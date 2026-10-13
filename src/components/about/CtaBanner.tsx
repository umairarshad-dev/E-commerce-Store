'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

export default function CtaBanner() {
  return (
    <section className="w-full bg-white">
      <div className="px-4 pb-16 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-screen-xl rounded-3xl bg-[var(--accent)] px-6 py-12 text-center shadow-[0_12px_40px_rgba(46,125,50,0.25)] md:px-12">
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              Ready to find your style?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/80">
              Browse the latest drops and refresh your wardrobe today.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="solid"
                href="/shop"
                size="lg"
                showArrow
                className="bg-white text-[var(--accent)] shadow-none hover:bg-white/90 hover:text-[var(--accent)]"
              >
                Shop Now
              </Button>
              <Button
                variant="outline"
                href="/contact"
                size="lg"
                className="border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-[var(--accent)]"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
