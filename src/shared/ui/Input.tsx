import React, { InputHTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  label?: string;
}

export default function Input({
  id,
  placeholder = '',
  type,
  value,
  onChange = () => {},
  className,
  labelClassName,
  disabled,
  label,
}: InputProps) {
  return (
    <div className='flex flex-col gap-y-1.5'>
      {label && <span className={cn(labelClassName)}>{label}</span>}
      <input
        id={id}
        name={id}
        className={cn(
          'bg-fill border-border rounded-5 w-full border-[1px] px-4 py-2 focus:outline-none',
          className,
          disabled && 'cursor-not-allowed opacity-50',
        )}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
