import React, { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  disabled?: boolean;
  halfWidth?: boolean;
}

export default function Button({
  onClick,
  disabled,
  label,
  name,
  type,
  halfWidth = false,
}: ButtonProps) {
  return (
    <button
      name={name}
      type={type || 'button'}
      className={cn(
        'disabled:bg-sub disabled:text-border box-shadow-buttonLg rounded-10 hover:bg-primary-hover mb-normal-spacing bg-point z-30 h-16 flex-shrink-0 cursor-pointer text-lg font-semibold text-white transition duration-300',
        halfWidth ? 'flex-1' : 'w-full',
      )}
      disabled={disabled ?? false}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
