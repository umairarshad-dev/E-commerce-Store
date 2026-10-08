'use client';

import React, { useState } from 'react';

interface ProductTabsProps {
  product: {
    materials?: string;
    care?: string;
    dimensions?: string;
    origin?: string;
    description?: string;
    sku?: string;
  };
}

const CheckIcon = () => (
  <svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const TABS = ['Details', 'Size & Fit', 'Material & Care', 'Shipping & Returns'] as const;
type Tab = typeof TABS[number];

function TabContent({ tab, product }: { tab: Tab; product: ProductTabsProps['product'] }) {
  const sku = product.sku ?? 'OLG-TS-OLV-2024';

  if (tab === 'Details') {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
          {[
            'Regular fit, true to size',
            'Ribbed crewneck collar',
            'Short sleeves with clean hem',
            'Front graphic print — durable wash',
            'Reinforced shoulder seams',
            'Straight hem, versatile styling',
          ].map((d) => (
            <li key={d} className="flex items-start gap-2 text-sm text-[var(--muted)] leading-relaxed list-none">
              <CheckIcon />{d}
            </li>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {['GOTS Certified', 'Fair Trade', 'Recyclable Packaging', 'Water-based Dyes', 'Carbon-neutral Shipping'].map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent-soft)] text-[var(--accent)] text-[11px] font-bold rounded-full w-fit">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {b}
            </span>
          ))}
        </div>
        <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-y-2 gap-x-8 text-sm">
          <div className="flex justify-between col-span-1">
            <span className="text-[var(--muted)]">SKU</span>
            <span className="font-mono text-xs text-[var(--ink)] font-medium">{sku}</span>
          </div>
          {product.origin && (
            <div className="flex justify-between col-span-1">
              <span className="text-[var(--muted)]">Origin</span>
              <span className="text-[var(--ink)] font-medium">{product.origin}</span>
            </div>
          )}
          {product.dimensions && (
            <div className="flex justify-between col-span-2 md:col-span-1">
              <span className="text-[var(--muted)]">Dimensions</span>
              <span className="text-[var(--ink)] font-medium text-right">{product.dimensions}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (tab === 'Size & Fit') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
          {[
            "Model is 6'1\" (185 cm) and wears size M",
            'Regular fit — not slim, not oversized',
            'True to size — no need to size up or down',
            'Chest: 38–40" for size M',
            'Shoulder seam sits at shoulder point',
            'Length hits at mid-hip for easy tucking',
          ].map((d) => (
            <li key={d} className="flex items-start gap-2 text-sm text-[var(--muted)] leading-relaxed list-none">
              <CheckIcon />{d}
            </li>
          ))}
        </div>
        <p className="text-xs text-[var(--muted)] pt-1">
          If you are between sizes, we recommend sizing up for a more comfortable fit.
        </p>
      </div>
    );
  }

  if (tab === 'Material & Care') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
          {[
            product.materials ?? '100% GOTS certified organic cotton',
            '220 gsm midweight jersey — soft & durable',
            'Garment dyed & pre-washed for softness',
            product.care ?? 'Machine wash cold with similar colors',
            'Tumble dry low or lay flat to dry',
            'Do not bleach or dry-clean',
            'Cool iron on reverse side only',
            'Do not iron directly on print',
          ].map((d) => (
            <li key={d} className="flex items-start gap-2 text-sm text-[var(--muted)] leading-relaxed list-none">
              <CheckIcon />{d}
            </li>
          ))}
        </div>
      </div>
    );
  }

  // Shipping & Returns
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
        {[
          'Free standard shipping on orders over Rs 5,000',
          'Express shipping available — Rs 299',
          'Standard delivery: 3–5 business days',
          'Express delivery: 1–2 business days',
          'Free returns within 7 days of delivery',
          'Item must be unworn, unwashed, with tags attached',
          'Cash on Delivery available nationwide',
          'Tracking link sent via SMS & email',
        ].map((d) => (
          <li key={d} className="flex items-start gap-2 text-sm text-[var(--muted)] leading-relaxed list-none">
            <CheckIcon />{d}
          </li>
        ))}
      </div>
    </div>
  );
}

/* ── Accordion item for mobile ── */
function AccordionItem({ tab, product, open, onToggle }: {
  tab: Tab;
  product: ProductTabsProps['product'];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent)]"
      >
        <span className="text-sm font-bold text-[var(--ink)]">{tab}</span>
        <svg
          className={`w-4 h-4 text-[var(--muted)] transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-4">
          <TabContent tab={tab} product={product} />
        </div>
      )}
    </div>
  );
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Details');
  const [openAccordion, setOpenAccordion] = useState<Tab | null>('Details');

  return (
    <>
      {/* Desktop tabs */}
      <div className="hidden md:block">
        <div className="flex border-b border-gray-200 gap-1" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`tabpanel-${tab}`}
              id={`tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`
                px-5 py-3.5 text-sm font-semibold transition-all duration-150 rounded-t-lg border-b-2 -mb-px
                focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-inset
                ${activeTab === tab
                  ? 'text-[var(--accent)] border-[var(--accent)]'
                  : 'text-[var(--muted)] border-transparent hover:text-[var(--ink)] hover:border-gray-300'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>
        <div
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="pt-6"
        >
          <TabContent tab={activeTab} product={product} />
        </div>
      </div>

      {/* Mobile accordion */}
      <div className="md:hidden border border-gray-100 rounded-2xl px-4" role="list">
        {TABS.map((tab) => (
          <AccordionItem
            key={tab}
            tab={tab}
            product={product}
            open={openAccordion === tab}
            onToggle={() => setOpenAccordion(openAccordion === tab ? null : tab)}
          />
        ))}
      </div>
    </>
  );
}
