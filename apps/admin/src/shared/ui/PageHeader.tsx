import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className='mt-6 flex flex-col gap-1'>
      <p className='text-xl font-semibold'>{title}</p>
      <p className='text-lg'>{description}</p>
    </div>
  );
}
