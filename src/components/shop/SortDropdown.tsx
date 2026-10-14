'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export interface SortOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface SortDropdownProps<T extends string = string> {
  value: T;
  options: SortOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  /** accessible name, defaults to "Sort by" */
  label?: string;
}

const TYPEAHEAD_RESET_MS = 500;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

/**
 * Custom accessible "Sort by" listbox/popover — never a native <select>.
 * Desktop: popover anchored under the trigger. Mobile (< lg): bottom sheet
 * with larger 48px rows. Full keyboard support incl. type-ahead.
 */
export default function SortDropdown<T extends string = string>({
  value,
  options,
  onChange,
  className = '',
  label = 'Sort by',
}: SortDropdownProps<T>) {
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;
  const isDesktop = useIsDesktop();

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const typeaheadRef = useRef<{ buffer: string; timer: ReturnType<typeof setTimeout> | undefined }>({
    buffer: '',
    timer: undefined,
  });

  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const selectedLabel = options[selectedIndex]?.label ?? '';

  const close = useCallback(
    (refocusTrigger = true) => {
      setOpen(false);
      setActiveIndex(-1);
      if (refocusTrigger) triggerRef.current?.focus();
    },
    [],
  );

  const openMenu = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setOpen(true);
    },
    [],
  );

  /* Close on outside click (desktop popover) */
  useEffect(() => {
    if (!open || !isDesktop) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open, isDesktop]);

  /* ESC closes from anywhere */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [open, close]);

  /* Move focus into the listbox when opened (aria-activedescendant pattern) */
  useEffect(() => {
    if (open) listboxRef.current?.focus();
  }, [open, isDesktop]);

  /* Keep the keyboard-active option in view */
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    document
      .getElementById(`${baseId}-option-${activeIndex}`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex, baseId]);

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!open) openMenu(selectedIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) openMenu(options.length - 1);
    }
  };

  const runTypeahead = (char: string) => {
    const state = typeaheadRef.current;
    state.buffer += char.toLowerCase();
    if (state.timer) clearTimeout(state.timer);
    state.timer = setTimeout(() => {
      state.buffer = '';
    }, TYPEAHEAD_RESET_MS);

    const query = state.buffer;
    const from = query.length > 1 ? activeIndex : -1;
    let match = -1;
    for (let i = 1; i <= options.length; i++) {
      const index = (from + i) % options.length;
      if (options[index].label.toLowerCase().startsWith(query)) {
        match = index;
        break;
      }
    }
    if (match >= 0) setActiveIndex(match);
  };

  const handleListboxKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((i) => (i + 1) % options.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((i) => (i - 1 + options.length) % options.length);
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        const option = options[activeIndex];
        if (option) {
          onChange(option.value);
          close();
        }
        break;
      }
      case 'Tab':
        close(false);
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          runTypeahead(event.key);
        }
    }
  };

  const select = (option: SortOption<T>) => {
    onChange(option.value);
    close();
  };

  const handleRootBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && rootRef.current?.contains(next)) return;
    if (open) {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const optionId = (index: number) => `${baseId}-option-${index}`;

  const listboxProps = {
    id: listboxId,
    role: 'listbox' as const,
    tabIndex: -1,
    ref: listboxRef,
    onKeyDown: handleListboxKeyDown,
    'aria-label': label,
    'aria-activedescendant':
      open && activeIndex >= 0 ? optionId(activeIndex) : undefined,
    className: 'focus:outline-none',
  };

  return (
    <div ref={rootRef} className={`relative ${className}`} onBlur={handleRootBlur}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? close() : openMenu(selectedIndex))}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        className="flex h-11 items-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm transition-colors duration-150 hover:border-black/20 focus:border-black focus:outline-none focus-visible:ring-[3px] focus-visible:ring-black/10"
      >
        <span className="text-[var(--muted)]">{label}:</span>
        <span className="font-semibold text-[var(--ink)]">{selectedLabel}</span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-[var(--ink)] transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Desktop popover */}
      {open && isDesktop && (
        <div
          {...listboxProps}
          className="animate-dropdown-in absolute right-0 z-50 mt-2 min-w-[220px] rounded-2xl border border-black/5 bg-white p-1.5 shadow-xl"
        >
          {options.map((option, index) => {
            const active = index === activeIndex;
            const selected = option.value === value;
            const Icon = option.icon;
            return (
              <div
                key={option.value}
                id={optionId(index)}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(option)}
                className={`flex h-10 cursor-pointer select-none items-center gap-2.5 rounded-xl px-3 text-sm transition-colors duration-100 ${
                  selected
                    ? 'bg-neutral-100 font-semibold text-black'
                    : active
                      ? 'bg-neutral-100 text-[var(--ink)]'
                      : 'text-[var(--ink)]'
                }`}
              >
                {Icon && (
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      selected ? 'text-black' : 'text-[var(--muted)]'
                    }`}
                  />
                )}
                <span className="truncate">{option.label}</span>
                {selected && (
                  <CheckIcon className="ml-auto h-4 w-4 shrink-0 text-black" strokeWidth={2.5} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile bottom sheet */}
      {open && !isDesktop && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div
            onClick={() => close()}
            className="animate-fade-in absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="animate-sheet-in absolute inset-x-0 bottom-0 rounded-t-3xl bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_40px_rgba(0,0,0,0.18)]">
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-neutral-200" aria-hidden="true" />
            <div className="mb-1 flex items-center justify-between">
              <span className="font-heading text-base font-extrabold text-[var(--ink)]">
                {label}
              </span>
              <button
                type="button"
                onClick={() => close()}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div {...listboxProps}>
              {options.map((option, index) => {
                const active = index === activeIndex;
                const selected = option.value === value;
                const Icon = option.icon;
                return (
                  <div
                    key={option.value}
                    id={optionId(index)}
                    role="option"
                    aria-selected={selected}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => select(option)}
                    className={`flex h-12 cursor-pointer select-none items-center gap-3 rounded-xl px-3 text-base transition-colors duration-100 ${
                      selected
                        ? 'bg-neutral-100 font-semibold text-black'
                        : active
                          ? 'bg-neutral-100 text-[var(--ink)]'
                          : 'text-[var(--ink)]'
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className={`h-5 w-5 shrink-0 ${
                          selected ? 'text-black' : 'text-[var(--muted)]'
                        }`}
                      />
                    )}
                    <span className="truncate">{option.label}</span>
                    {selected && (
                      <CheckIcon className="ml-auto h-5 w-5 shrink-0 text-black" strokeWidth={2.5} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
