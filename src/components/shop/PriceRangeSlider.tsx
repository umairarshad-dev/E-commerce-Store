'use client';

import React, { useEffect, useState } from 'react';
import { formatPrice } from './catalog';

interface PriceRangeSliderProps {
  value: [number, number];
  bounds: { min: number; max: number; step: number };
  onChange: (value: [number, number]) => void;
}

/**
 * Dual-thumb range slider (accent-filled track between the thumbs, white
 * thumbs with an accent border + soft shadow) synced both ways with
 * Min / Max number inputs. Native range inputs keep arrow-key support
 * (step = 100) for free.
 */
export default function PriceRangeSlider({
  value,
  bounds,
  onChange,
}: PriceRangeSliderProps) {
  const [minText, setMinText] = useState(String(value[0]));
  const [maxText, setMaxText] = useState(String(value[1]));
  const [minFocused, setMinFocused] = useState(false);
  const [maxFocused, setMaxFocused] = useState(false);

  // Keep the text inputs in sync when the slider (or URL) changes the value.
  useEffect(() => {
    if (!minFocused) setMinText(String(value[0]));
  }, [value[0], minFocused]);
  useEffect(() => {
    if (!maxFocused) setMaxText(String(value[1]));
  }, [value[1], maxFocused]);

  const span = Math.max(bounds.max - bounds.min, 1);
  const toPct = (v: number) => ((v - bounds.min) / span) * 100;

  // Commit on every keystroke (clamped, min <= max guaranteed) so the slider
  // and URL stay in sync even if a blur event never arrives; the text field
  // normalizes back to the committed value on blur via the sync effects above.
  const parseRaw = (raw: string): number => {
    const digits = raw.replace(/[^0-9]/g, '');
    return digits === '' ? NaN : Number(digits);
  };

  const handleMinChange = (raw: string) => {
    const parsed = parseRaw(raw);
    if (Number.isNaN(parsed)) return;
    onChange([Math.min(Math.max(parsed, bounds.min), value[1]), value[1]]);
  };

  const handleMaxChange = (raw: string) => {
    const parsed = parseRaw(raw);
    if (Number.isNaN(parsed)) return;
    onChange([value[0], Math.max(Math.min(parsed, bounds.max), value[0])]);
  };

  const commitMin = () => {
    setMinFocused(false);
    handleMinChange(minText);
  };
  const commitMax = () => {
    setMaxFocused(false);
    handleMaxChange(maxText);
  };

  // Bring the min thumb on top when the thumbs nearly overlap so it stays grabbable.
  const minOnTop = value[1] - value[0] <= bounds.step * 2;

  return (
    <div>
      <div className="relative flex h-5 items-center">
        {/* Track */}
        <div className="absolute inset-x-0 h-1 rounded-full bg-neutral-200" />
        {/* Accent fill between thumbs */}
        <div
          className="absolute h-1 rounded-full bg-[var(--accent)] transition-[left,right] duration-100"
          style={{
            left: `${toPct(value[0])}%`,
            right: `${100 - toPct(value[1])}%`,
          }}
        />

        <input
          type="range"
          className="price-range-input absolute inset-x-0 z-10"
          style={{ zIndex: minOnTop ? 5 : 3 }}
          min={bounds.min}
          max={bounds.max}
          step={bounds.step}
          value={value[0]}
          aria-label={`Minimum price, currently ${formatPrice(value[0])}`}
          onChange={(e) => handleMinChange(e.target.value)}
        />
        <input
          type="range"
          className="price-range-input absolute inset-x-0 z-10"
          style={{ zIndex: 4 }}
          min={bounds.min}
          max={bounds.max}
          step={bounds.step}
          value={value[1]}
          aria-label={`Maximum price, currently ${formatPrice(value[1])}`}
          onChange={(e) => handleMaxChange(e.target.value)}
        />
      </div>

      {/* Min / Max number inputs */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="relative block">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--muted)]">
            Rs
          </span>
          <span className="sr-only">Minimum price</span>
          <input
            type="text"
            inputMode="numeric"
            value={minText}
            onChange={(e) => {
              setMinText(e.target.value);
              handleMinChange(e.target.value);
            }}
            onFocus={() => setMinFocused(true)}
            onBlur={commitMin}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                commitMin();
                (e.target as HTMLInputElement).blur();
              }
            }}
            className="h-10 w-full rounded-xl border border-black/5 bg-neutral-50 pl-9 pr-3 text-sm tabular-nums text-[var(--ink)] transition-colors duration-150 focus:border-[var(--accent)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]"
          />
        </label>
        <label className="relative block">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--muted)]">
            Rs
          </span>
          <span className="sr-only">Maximum price</span>
          <input
            type="text"
            inputMode="numeric"
            value={maxText}
            onChange={(e) => {
              setMaxText(e.target.value);
              handleMaxChange(e.target.value);
            }}
            onFocus={() => setMaxFocused(true)}
            onBlur={commitMax}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                commitMax();
                (e.target as HTMLInputElement).blur();
              }
            }}
            className="h-10 w-full rounded-xl border border-black/5 bg-neutral-50 pl-9 pr-3 text-sm tabular-nums text-[var(--ink)] transition-colors duration-150 focus:border-[var(--accent)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]"
          />
        </label>
      </div>

      <p className="mt-2 text-[11px] text-[var(--muted)]" aria-live="polite">
        {formatPrice(value[0])} – {formatPrice(value[1])}
      </p>
    </div>
  );
}
