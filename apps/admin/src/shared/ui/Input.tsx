import React, { InputHTMLAttributes } from 'react';

import { cn } from '@festamate/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelClassName?: string;
  disabled?: boolean;
  label?: string;
  maxLength?: number;
  error?: string | null;
}

export default function Input({
  label,
  placeholder,
  id,
  type,
  error,
  ...rest
}: InputProps) {
  return (
    <div className='flex flex-col gap-y-1.5'>
      <p className='flex items-center gap-2'>
        <span className='text-lg'>{label}</span>
        {error && <span className='text-important'>{error}</span>}
      </p>
      <input
        id={id}
        className={cn(
          'border-border rounded-10 focus:border-point/60 w-full border-[1px] bg-white px-4 py-2 transition duration-150 focus:outline-none',
          error ? 'border-important/40' : 'border-border',
        )}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
