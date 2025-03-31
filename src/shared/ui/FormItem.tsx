import React from 'react';

import { cn } from '../utils';

interface FormItemProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  childrenWrapper?: boolean;
  className?: string;
}

export default function FormItem({
  title,
  description,
  children,
  className,
}: FormItemProps) {
  return (
    <div className='flex flex-col gap-y-3'>
      <div className='flex flex-col'>
        <span className='title'>{title}</span>
        <span className='text-light'>{description}</span>
      </div>
      {className ? (
        <div className={cn('h-fit', className)}>{children}</div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
