'use client';

import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { isLightColor, type ColorOption } from './catalog';

interface ColorFilterProps {
  colors: ColorOption[];
  selected: string[];
  onToggle: (value: string) => void;
}

/**
 * Circular color swatches in a wrap grid. Selected swatches get a 2px accent
 * ring with a 2px white gap and a check icon (dark on light colors).
 */
export default function ColorFilter({
  colors,
  selected,
  onToggle,
}: ColorFilterProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {colors.map((color) => {
        const checked = selected.includes(color.name);
        const light = isLightColor(color.hex);
        const label = color.name.charAt(0).toUpperCase() + color.name.slice(1);
        return (
          <button
            key={color.name}
            type="button"
            onClick={() => onToggle(color.name)}
            title={label}
            aria-label={`${label} color${checked ? ', selected' : ''}`}
            aria-pressed={checked}
            className={`relative flex h-7 w-7 items-center justify-center rounded-full transition-all duration-150 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${
              checked
                ? 'ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-white'
                : ''
            }`}
            style={{ backgroundColor: color.hex }}
          >
            {/* thin border keeps white swatches visible against the white card */}
            <span
              aria-hidden="true"
              className={`absolute inset-0 rounded-full ${
                color.name === 'white' ? 'border border-black/10' : ''
              }`}
            />
            {checked && (
              <CheckIcon
                className={`relative h-3.5 w-3.5 ${light ? 'text-neutral-800' : 'text-white'}`}
                strokeWidth={3}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
