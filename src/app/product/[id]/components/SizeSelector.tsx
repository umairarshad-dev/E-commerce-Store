'use client';

import React, { useState } from 'react';

export interface SizeOption {
  label: string;
  inStock?: boolean;
  stock?: number;
}

interface SizeGuideEntry {
  size: string;
  chest: string;
  length: string;
  waist: string;
}

const SIZE_GUIDE: SizeGuideEntry[] = [
  { size: 'XS', chest: '34–36', length: '26', waist: '26–28' },
  { size: 'S',  chest: '36–38', length: '27', waist: '28–30' },
  { size: 'M',  chest: '38–40', length: '28', waist: '30–32' },
  { size: 'L',  chest: '40–42', length: '29', waist: '32–34' },
  { size: 'XL', chest: '42–44', length: '30', waist: '34–36' },
  { size: 'XXL',chest: '44–46', length: '31', waist: '36–38' },
  { size: '28',  chest: '—',    length: '—',  waist: '28'    },
  { size: '30',  chest: '—',    length: '—',  waist: '30'    },
  { size: '32',  chest: '—',    length: '—',  waist: '32'    },
  { size: '34',  chest: '—',    length: '—',  waist: '34'    },
  { size: '36',  chest: '—',    length: '—',  waist: '36'    },
  { size: '38',  chest: '—',    length: '—',  waist: '38'    },
];

interface SizeSelectorProps {
  sizes: SizeOption[];
  selectedSize: string;
  onSelect: (size: string) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  const [guideOpen, setGuideOpen] = useState(false);

  const relevantGuide = SIZE_GUIDE.filter((g) => sizes.some((s) => s.label === g.size));

  const lowStock = sizes.find(
    (s) => s.label === selectedSize && s.stock !== undefined && s.stock > 0 && s.stock <= 5
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">Size</span>
        <button
          onClick={() => setGuideOpen(true)}
          className="text-xs font-semibold text-[var(--accent)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-1 rounded"
        >
          Size Guide →
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isSelected = selectedSize === size.label;
          const isOOS = size.inStock === false;
          return (
            <button
              key={size.label}
              onClick={() => !isOOS && onSelect(size.label)}
              disabled={isOOS}
              aria-label={`Size ${size.label}${isOOS ? ' (out of stock)' : ''}`}
              aria-pressed={isSelected}
              className={`
                relative h-11 min-w-[48px] px-4 rounded-xl border text-sm font-semibold transition-all duration-150
                focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
                ${isSelected && !isOOS
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                  : isOOS
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed opacity-40'
                  : 'border-gray-200 text-[var(--ink)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]'}
              `}
            >
              {size.label}
              {isOOS && (
                <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl pointer-events-none">
                  <span className="absolute w-[110%] h-px bg-gray-400/70 rotate-[-20deg]" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {lowStock && (
        <p className="mt-2 text-xs font-semibold text-orange-500 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Only {lowStock.stock} left in size {lowStock.label}!
        </p>
      )}

      {/* Size Guide Modal */}
      {guideOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="size-guide-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setGuideOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 id="size-guide-title" className="text-base font-bold text-[var(--ink)]">Size Guide (inches)</h3>
              <button
                onClick={() => setGuideOpen(false)}
                aria-label="Close size guide"
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                <svg className="w-5 h-5 text-[var(--ink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 text-left text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Size</th>
                    <th className="py-2 text-center text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Chest</th>
                    <th className="py-2 text-center text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Waist</th>
                    <th className="py-2 text-center text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Length</th>
                  </tr>
                </thead>
                <tbody>
                  {(relevantGuide.length > 0 ? relevantGuide : SIZE_GUIDE).map((row) => (
                    <tr key={row.size} className={`border-b border-gray-100 last:border-0 ${selectedSize === row.size ? 'bg-[var(--accent-soft)]' : ''}`}>
                      <td className={`py-2.5 font-semibold ${selectedSize === row.size ? 'text-[var(--accent)]' : 'text-[var(--ink)]'}`}>{row.size}</td>
                      <td className="py-2.5 text-center text-[var(--muted)]">{row.chest}</td>
                      <td className="py-2.5 text-center text-[var(--muted)]">{row.waist}</td>
                      <td className="py-2.5 text-center text-[var(--muted)]">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[11px] text-[var(--muted)]">Measurements are in inches. For the best fit, measure yourself and compare with the chart above.</p>
          </div>
        </div>
      )}
    </div>
  );
}
