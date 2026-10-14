'use client';

import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'solid' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  showArrow?: boolean;
  className?: string;
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: undefined;
  children: React.ReactNode;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  children: React.ReactNode;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm rounded-xl',
  md: 'h-11 px-6 text-sm rounded-xl',
  lg: 'h-12 px-7 text-base rounded-xl',
};

const variantClasses: Record<ButtonVariant, string> = {
  // Solid button - used for primary CTAs (search, checkout, etc.)
  solid:
    'bg-black text-white border border-transparent hover:bg-neutral-800 active:scale-[0.98] ' +
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-black/10 ' +
    'focus-visible:border-black disabled:opacity-50 disabled:pointer-events-none ' +
    'transition-[background-color,border-color,color,transform,filter] duration-150 ease-out',
  // Outline button - white bg, black hover
  outline:
    'bg-white text-[var(--ink)] border border-black/15 hover:border-black hover:bg-black ' +
    'hover:text-white active:scale-[0.98] ' +
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-black/10 ' +
    'focus-visible:border-black ' +
    'transition-[background-color,border-color,color,transform] duration-150 ease-out',
};

const arrowShift = 'group-hover/btn:translate-x-1';

function Arrow() {
  return (
    <svg
      className={`h-4 w-4 shrink-0 transition-transform duration-200 ease-out ${arrowShift}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

function classes(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  className: string,
) {
  return `${variantClasses[variant]} ${sizeClasses[size]} ${
    fullWidth ? 'w-full' : ''
  } ${className}`.trim();
}

export default function Button(props: ButtonProps) {
  const {
    variant = 'solid',
    size = 'md',
    fullWidth = false,
    showArrow = false,
    className = '',
    children,
  } = props;

  const base = `group/btn inline-flex items-center justify-center gap-2 font-semibold ${classes(
    variant,
    size,
    fullWidth,
    className,
  )}`;

  if ('href' in props && props.href) {
    const isExternal = /^https?:\/\//.test(props.href);
    const content = (
      <>
        <span className="inline-flex items-center gap-2">{children}</span>
        {showArrow && <Arrow />}
      </>
    );

    if (isExternal) {
      return (
        <a href={props.href} className={base}>
          {content}
        </a>
      );
    }

    return (
      <Link href={props.href} className={base}>
        {content}
      </Link>
    );
  }

  const { variant: _v, size: _s, fullWidth: _fw, showArrow: _sa, className: _c, children: _ch, ...rest } =
    props as ButtonAsButtonProps;

  return (
    <button className={base} {...rest}>
      <span className="inline-flex items-center gap-2">{children}</span>
      {showArrow && <Arrow />}
    </button>
  );
}
