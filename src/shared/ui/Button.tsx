import React, { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | React.JSX.Element;
  disabled?: boolean;
  halfWidth?: boolean;
  shadow?: boolean;
  bgColor?: string;
}

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
}: ButtonProps) {
  return (
    <button
      name={name}
      type={type || 'button'}
      className={cn(
        'disabled:bg-sub disabled:text-border rounded-10 mb-normal-spacing z-30 h-16 flex-shrink-0 cursor-pointer text-lg font-semibold text-white transition duration-300',
        halfWidth ? 'flex-1' : 'w-full',
        shadow && 'box-shadow-buttonLg',
        className,
        bgColor ?? 'hover:bg-point-hover bg-point',
      )}
      disabled={disabled ?? false}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
