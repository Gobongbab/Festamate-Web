import React, { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | React.JSX.Element;
  disabled?: boolean;
  halfWidth?: boolean;
  shadow?: boolean;
  bgColor?: string;
  size?: Size;
}

const SIZE: Record<Size, string> = {
  lg: 'h-16 font-semibold text-lg',
  md: 'py-4 font-medium text-md',
  sm: 'py-2',
};

export default function Button({
  onClick,
  disabled,
  label,
  name,
  type,
  halfWidth = false,
  shadow = true,
  className,
  bgColor,
  size = 'lg',
}: ButtonProps) {
  return (
    <button
      name={name}
      type={type || 'button'}
      className={cn(
        'disabled:bg-sub disabled:text-border rounded-10 mb-normal-spacing z-30 flex-shrink-0 cursor-pointer text-white transition duration-300',
        halfWidth ? 'flex-1' : 'w-full',
        shadow && 'box-shadow-buttonLg',
        className,
        bgColor ?? 'hover:bg-point-hover bg-point',
        SIZE[size],
      )}
      disabled={disabled ?? false}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
