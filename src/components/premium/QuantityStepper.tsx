'use client';

import React from 'react';

interface QuantityStepperProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export default function QuantityStepper({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  className = '',
}: QuantityStepperProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className={`
          w-10 h-10 rounded-full bg-white border border-gray-300
          flex items-center justify-center text-[var(--ink)]
          hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
        `}
        aria-label="Decrease quantity"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        className={`
          w-16 h-10 text-center font-semibold text-[var(--ink)]
          bg-[var(--accent-soft)] rounded-full
          focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
          tabular-nums
        `}
        aria-label="Quantity"
      />

      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className={`
          w-10 h-10 rounded-full bg-white border border-gray-300
          flex items-center justify-center text-[var(--ink)]
          hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
        `}
        aria-label="Increase quantity"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}
