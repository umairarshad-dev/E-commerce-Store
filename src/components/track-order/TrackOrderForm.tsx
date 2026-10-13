'use client';

import React, { useState } from 'react';
import {
  CubeIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

interface TrackOrderFormProps {
  initialOrder?: string;
  loading: boolean;
  error: string | null;
  onSubmit: (orderNumber: string, contact: string) => void;
}

const inputClasses =
  'h-12 w-full rounded-xl border border-black/10 bg-neutral-50 pl-11 pr-4 text-sm text-[var(--ink)] ' +
  'transition-colors duration-150 placeholder:text-neutral-400 focus:border-[var(--accent)] focus:bg-white ' +
  'focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]';

export default function TrackOrderForm({
  initialOrder = '',
  loading,
  error,
  onSubmit,
}: TrackOrderFormProps) {
  const [orderNumber, setOrderNumber] = useState(initialOrder);
  const [contact, setContact] = useState('');

  const canSubmit = orderNumber.trim().length > 0 && contact.trim().length > 0 && !loading;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (canSubmit) onSubmit(orderNumber.trim(), contact.trim());
  };

  const fillDemo = () => {
    setOrderNumber('ORD12345');
    if (!contact.trim()) setContact('sarah@example.com');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-black/5 bg-white p-6 shadow-soft md:p-8"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="order-number"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[var(--ink)]"
          >
            Order Number
          </label>
          <div className="relative">
            <CubeIcon
              className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]"
              aria-hidden="true"
            />
            <input
              id="order-number"
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="ORD12345"
              aria-invalid={!!error}
              aria-describedby={error ? 'track-order-error' : undefined}
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="order-contact"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[var(--ink)]"
          >
            Email or Phone
          </label>
          <div className="relative">
            <EnvelopeIcon
              className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]"
              aria-hidden="true"
            />
            <input
              id="order-contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="you@example.com"
              aria-invalid={!!error}
              aria-describedby={error ? 'track-order-error' : undefined}
              className={inputClasses}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] text-sm font-bold text-white shadow-[0_4px_14px_rgba(46,125,50,0.3)] transition duration-200 hover:brightness-95 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
      >
        {loading ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
              aria-hidden="true"
            />
            Tracking...
          </>
        ) : (
          <>
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            Track Order
          </>
        )}
      </button>

      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={fillDemo}
          className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-[var(--muted)] transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
        >
          Try demo: <span className="tabular-nums">ORD12345</span>
        </button>
      </div>

      <div aria-live="polite">
        {error && (
          <div
            id="track-order-error"
            className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </form>
  );
}
