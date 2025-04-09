import React, { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | React.JSX.Element;
  disabled?: boolean;
  halfWidth?: boolean;
  shadow?: boolean;
  size?: Size;
}

const SIZE: Record<Size, string> = {
  lg: 'h-16 font-semibold text-lg mb-normal-spacing z-30 rounded-10',
  md: 'py-3.5 font-medium text-md rounded-10',
  sm: 'py-2 px-4 rounded-5 border-border bg-fill w-fit text-dark border-[1px]',
};

export default function Button({
  onClick,
  disabled,
  label,
  name,
  type,
  halfWidth = false,
  shadow = false,
  className,
  size = 'lg',
}: ButtonProps) {
  return (
    <button
      id={name}
      name={name}
      type={type || 'button'}
      className={cn(
        'hover:bg-point-hover bg-point disabled:bg-sub disabled:text-border flex-shrink-0 cursor-pointer text-white transition duration-300',
        halfWidth ? 'flex-1' : 'w-full',
        shadow && 'box-shadow-button',
        className,
        SIZE[size],
      )}
      disabled={disabled ?? false}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
