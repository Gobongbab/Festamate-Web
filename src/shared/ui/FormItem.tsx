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
  childrenWrapper = true,
}: FormItemProps) {
  return (
    <div className='flex flex-col gap-y-3'>
      <div className='flex flex-col'>
        <span className='title'>{title}</span>
        <span className='text-light'>{description}</span>
      </div>
      {childrenWrapper ? (
        <div className='bg-fill border-border rounded-5 flex w-fit gap-x-4 border-[1px] px-4 py-2'>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
