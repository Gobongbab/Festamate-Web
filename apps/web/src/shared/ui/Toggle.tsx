import React, { InputHTMLAttributes } from 'react';

import { cn } from '@festamate/utils';

export interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string | React.JSX.Element;
  labelLeft?: boolean;
}

export default function Toggle({
  id,
  label,
  className,
  checked,
  labelLeft = false,
  onChange,
  ...rest
}: ToggleProps) {
  return (
    <div className={cn('flex items-center gap-x-2', className)}>
      <label
        id={id}
        className='relative inline-flex cursor-pointer items-center'
      >
        {labelLeft && label && (
          <label
            htmlFor={id}
            className='mr-2 cursor-pointer text-sm font-light'
          >
            {label}
          </label>
        )}
        <input
          type='checkbox'
          checked={checked}
          onChange={onChange}
          className='sr-only'
          {...rest}
        />
        <span
          className={cn(
            'border-border relative inline-flex h-6.5 w-14 cursor-pointer appearance-none items-center rounded-full border-[0.6px] px-[4px] shadow-inner transition duration-75 outline-none',
            checked ? 'bg-primary' : 'bg-gray-200',
          )}
        >
          <span
            className={cn(
              'inline-block size-4.5 rounded-full bg-white transition-all',
              checked && 'translate-x-[25px]',
            )}
          />
        </span>
      </label>
      {label && !labelLeft && (
        <label
          htmlFor={id}
          className='text-dark cursor-pointer text-sm font-light'
        >
          {label}
        </label>
      )}
    </div>
  );
}
