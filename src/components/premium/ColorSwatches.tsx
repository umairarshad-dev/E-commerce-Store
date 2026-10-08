'use client';

import React from 'react';

interface ColorSwatchesProps {
  colors: { name: string; hex: string }[];
  selectedColor: string;
  onSelect: (color: string) => void;
  maxDisplay?: number;
  showSelectedName?: boolean;
  className?: string;
}

export default function ColorSwatches({
  colors,
  selectedColor,
  onSelect,
  maxDisplay = 5,
  showSelectedName = false,
  className = '',
}: ColorSwatchesProps) {
  const displayColors = colors.slice(0, maxDisplay);
  const remainingCount = colors.length - maxDisplay;
  const selectedColorObj = colors.find((c) => c.name === selectedColor);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {displayColors.map((color) => (
        <button
          key={color.name}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(color.name);
          }}
          className={`
            relative w-[16px] h-[16px] rounded-full border-2 transition-all duration-300 flex-shrink-0
            ${selectedColor === color.name
              ? 'border-[var(--accent)] ring-2 ring-[var(--accent)] ring-offset-2 scale-110'
              : 'border-gray-300 hover:border-[var(--accent)] hover:scale-105'
            }
            focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
          `}
          style={{ backgroundColor: color.hex }}
          aria-label={`Select color ${color.name}`}
          aria-pressed={selectedColor === color.name}
          title={color.name}
        >
          {selectedColor === color.name && (
            <svg
              className="absolute inset-0 m-auto w-2.5 h-2.5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      ))}
      {remainingCount > 0 && (
        <span className="text-[11px] font-semibold text-[var(--muted)]">+{remainingCount}</span>
      )}
      {showSelectedName && selectedColorObj && (
        <span className="text-xs font-medium text-[var(--ink)] ml-1">
          {selectedColorObj.name}
        </span>
      )}
    </div>
  );
}
