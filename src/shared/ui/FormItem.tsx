import React from 'react';

interface FormItemProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  childrenWrapper?: boolean;
}

export default function FormItem({
  title,
  description,
  children,
}: FormItemProps) {
  return (
    <div className='flex flex-col gap-y-3'>
      <div className='flex flex-col'>
        <span className='title'>{title}</span>
        <span className='text-light'>{description}</span>
      </div>
      {children}
    </div>
  );
}
