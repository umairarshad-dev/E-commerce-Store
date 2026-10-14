'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  CheckIcon,
  ClipboardDocumentIcon,
  CreditCardIcon,
  HomeIcon,
  LifebuoyIcon,
  MapPinIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import {
  ORDER_STEPS,
  type OrderStatus,
  type TrackedOrder,
} from '@/data/orders';

const STATUS_STYLES: Record<OrderStatus, string> = {
  Placed: 'bg-neutral-100 text-neutral-700',
  Packed: 'bg-blue-50 text-blue-700',
  Shipped: 'bg-blue-50 text-blue-700',
  'Out for Delivery': 'bg-amber-50 text-amber-700',
  Delivered: 'bg-black text-white',
};

const formatRs = (n: number) => `Rs ${n.toLocaleString('en-US')}`;

function Stepper({ current }: { current: OrderStatus }) {
  const currentIndex = ORDER_STEPS.indexOf(current);

  return (
    <>
      {/* Horizontal (desktop) */}
      <ol className="hidden md:flex" aria-label="Order progress">
        {ORDER_STEPS.map((step, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li key={step} className="relative flex-1 text-center">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={`absolute right-1/2 top-4 h-0.5 w-full ${
                    i <= currentIndex ? 'bg-black' : 'bg-neutral-200'
                  }`}
                />
              )}
              <span
                className={`relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold ${
                  done
                    ? 'border-black bg-black text-white'
                    : active
                      ? 'animate-pulse border-black bg-white text-black'
                      : 'border-neutral-200 bg-white text-neutral-400'
                }`}
              >
                {done ? <CheckIcon className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </span>
              <span
                className={`mt-2 block text-xs font-semibold ${
                  done || active ? 'text-[var(--ink)]' : 'text-neutral-400'
                }`}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Vertical (mobile) */}
      <ol className="md:hidden" aria-label="Order progress">
        {ORDER_STEPS.map((step, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li key={step} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                    done
                      ? 'border-black bg-black text-white'
                      : active
                        ? 'animate-pulse border-black bg-white text-black'
                        : 'border-neutral-200 bg-white text-neutral-400'
                  }`}
                >
                  {done ? <CheckIcon className="h-4 w-4" strokeWidth={3} /> : i + 1}
                </span>
                {i < ORDER_STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`w-0.5 flex-1 ${i < currentIndex ? 'bg-black' : 'bg-neutral-200'}`}
                  />
                )}
              </div>
              <div className="pb-5 pt-1">
                <span
                  className={`text-sm font-semibold ${
                    done || active ? 'text-[var(--ink)]' : 'text-neutral-400'
                  }`}
                >
                  {step}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}

export default function TrackOrderResult({ order }: { order: TrackedOrder }) {
  const [copied, setCopied] = useState(false);

  const copyTracking = async () => {
    try {
      await navigator.clipboard.writeText(order.courier.trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Summary */}
      <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-heading text-xl font-extrabold tracking-tight text-[var(--ink)]">
              Order #{order.orderNumber}
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Placed on {order.placedAt}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLES[order.status]}`}
          >
            {order.status}
          </span>
        </div>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Estimated delivery:{' '}
          <span className="font-bold text-[var(--ink)]">{order.estimatedDelivery}</span>
        </p>

        <div className="mt-6">
          <Stepper current={order.status} />
        </div>
      </div>

      {/* Courier */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
            <TruckIcon className="h-5 w-5 text-black" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold text-[var(--ink)]">{order.courier.name}</p>
            <p className="text-xs tabular-nums text-[var(--muted)]">
              Tracking: {order.courier.trackingNumber}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={copyTracking}
          className="flex h-9 items-center gap-1.5 rounded-xl border border-black/10 px-3 text-xs font-semibold text-[var(--ink)] transition-colors duration-150 hover:border-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          aria-label="Copy tracking number"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-black" strokeWidth={3} />
          ) : (
            <ClipboardDocumentIcon className="h-4 w-4" />
          )}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Timeline + items */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-soft">
          <h3 className="font-heading text-base font-extrabold text-[var(--ink)]">Updates</h3>
          <ol className="mt-4 space-y-4">
            {order.events.map((event) => (
              <li key={event.date} className="flex gap-3">
                <span
                  className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                    event.status === order.status ? 'bg-black' : 'bg-neutral-200'
                  }`}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-[var(--ink)]">{event.status}</p>
                  <p className="text-sm text-[var(--muted)]">{event.description}</p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">{event.date}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-soft">
          <h3 className="font-heading text-base font-extrabold text-[var(--ink)]">Items</h3>
          <ul className="mt-4 space-y-4">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-contain p-1"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[var(--ink)]">{item.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {item.color} · Size {item.size} · Qty {item.qty}
                  </p>
                </div>
                <span className="text-sm font-bold tabular-nums text-[var(--ink)]">
                  {formatRs(item.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-1.5 border-t border-black/5 pt-4 text-sm">
            <div className="flex justify-between text-[var(--muted)]">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatRs(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[var(--muted)]">
              <span>Shipping</span>
              <span className="tabular-nums">
                {order.shipping === 0 ? 'Free' : formatRs(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between pt-1 font-bold text-[var(--ink)]">
              <span>Total</span>
              <span className="tabular-nums">{formatRs(order.total)}</span>
            </div>
          </div>

          <div className="mt-4 space-y-3 border-t border-black/5 pt-4 text-sm">
            <div className="flex gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />
              <p className="text-[var(--muted)]">{order.address}</p>
            </div>
            <div className="flex gap-2.5">
              <CreditCardIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />
              <p className="text-[var(--muted)]">{order.payment}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href="mailto:support@pakipreneurs.com"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-black/15 bg-white text-sm font-semibold text-[var(--ink)] transition-all duration-200 hover:border-black hover:bg-black hover:text-white focus:outline-none focus-visible:ring-[3px] focus-visible:ring-black/10"
        >
          <LifebuoyIcon className="h-4 w-4" aria-hidden="true" />
          Need help?
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-black text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-black/10"
        >
          <HomeIcon className="h-4 w-4" aria-hidden="true" />
          Download invoice
        </button>
      </div>
    </div>
  );
}
