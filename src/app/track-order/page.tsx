'use client';

import React, { Suspense, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  BanknotesIcon,
  ChevronRightIcon,
  LockClosedIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import TrackOrderForm from '@/components/track-order/TrackOrderForm';
import TrackOrderResult from '@/components/track-order/TrackOrderResult';
import { getOrder, type TrackedOrder } from '@/data/orders';

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <TrackOrderContent />
    </Suspense>
  );
}

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const prefill = searchParams.get('order') ?? '';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<TrackedOrder | null>(null);

  const handleTrack = useCallback(
    async (orderNumber: string, contact: string) => {
      setLoading(true);
      setError(null);
      setOrder(null);
      try {
        const result = await getOrder(orderNumber, contact);
        setOrder(result);
      } catch {
        setError(
          "We couldn't find an order matching those details. Check your order number and email or phone, then try again.",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Support ?order=ORD12345 deep links
  useEffect(() => {
    if (prefill && !order && !loading) {
      handleTrack(prefill, 'prefilled');
    }
    // only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill]);

  return (
    <div className="min-h-screen w-full" style={{ background: 'var(--page)' }}>
      <div className="px-4 py-12 sm:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm">
            <Link
              href="/"
              className="text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              Home
            </Link>
            <ChevronRightIcon className="h-3 w-3 text-[var(--muted)]" />
            <span className="text-[var(--ink)]">Track Order</span>
          </nav>

          {/* Header */}
          <div className="mb-8 flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-neutral-100">
              <TruckIcon className="h-7 w-7 text-black" aria-hidden="true" />
            </span>
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[var(--ink)] md:text-4xl">
                Track Your Order
              </h1>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Enter your order number to see live status and delivery updates.
              </p>
            </div>
          </div>

          <TrackOrderForm
            initialOrder={prefill}
            loading={loading}
            error={error}
            onSubmit={handleTrack}
          />

          {/* Trust items before searching */}
          {!order && !loading && (
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: TruckIcon, label: 'Free delivery over Rs 5,000' },
                { icon: BanknotesIcon, label: '7-day easy returns' },
                { icon: LockClosedIcon, label: 'Cash on delivery' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                    <Icon className="h-4.5 w-4.5 text-black" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-[var(--ink)]">{label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8" aria-live="polite">
            {order && <TrackOrderResult order={order} />}
          </div>
        </div>
      </div>
    </div>
  );
}
