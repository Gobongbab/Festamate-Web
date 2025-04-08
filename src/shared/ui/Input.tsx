import React, { InputHTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  label?: string;
  maxLength?: number;
}

export default function Input({
  id,
  placeholder = '',
  type,
  value = '',
  onChange = () => {},
  className,
  labelClassName,
  disabled,
  label,
  maxLength,
  ...rest
}: InputProps) {
  const enableMaxLengthEffect =
    typeof value === 'string' && maxLength && value.length > maxLength
      ? true
      : false;

  return (
    <div className='flex flex-col gap-y-1.5'>
      {label && <span className={cn(labelClassName)}>{label}</span>}
      <input
        id={id}
        className={cn(
          'border-border rounded-5 focus:border-point/60 w-full border-[1px] bg-white px-4 py-2 transition duration-150 focus:outline-none',
          className,
          disabled && 'cursor-not-allowed opacity-50',
          enableMaxLengthEffect && 'shake border-important',
        )}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      {maxLength && typeof value === 'string' && (
        <div
          className={cn(
            'text-light flex justify-end',
            enableMaxLengthEffect && 'text-important',
          )}
        >
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}
