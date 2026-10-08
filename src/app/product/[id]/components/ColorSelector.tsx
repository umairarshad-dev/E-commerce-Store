'use client';

import React from 'react';

export interface ColorOption {
  name: string;
  code: string;
  inStock?: boolean;
}

interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor: string;
  onSelect: (color: string) => void;
}

export default function ColorSelector({ colors, selectedColor, onSelect }: ColorSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">Color</span>
        {selectedColor && (
          <span className="text-xs font-medium text-[var(--ink)] capitalize">{selectedColor}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {colors.map((color) => {
          const isSelected = selectedColor === color.name;
          const isOOS = color.inStock === false;
          return (
            <button
              key={color.name}
              onClick={() => !isOOS && onSelect(color.name)}
              disabled={isOOS}
              aria-label={`Color: ${color.name}${isOOS ? ' (out of stock)' : ''}`}
              aria-pressed={isSelected}
              title={color.name}
              className={`
                relative w-8 h-8 rounded-full transition-all duration-150 flex-shrink-0
                focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
                ${isSelected ? 'ring-2 ring-[var(--accent)] ring-offset-2 scale-110' : 'ring-1 ring-gray-300 hover:ring-[var(--accent)] hover:scale-105'}
                ${isOOS ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer'}
              `}
              style={{ backgroundColor: color.code }}
            >
              {isSelected && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              {isOOS && (
                <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                  <span className="absolute w-[140%] h-px bg-gray-500/60 rotate-45" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
