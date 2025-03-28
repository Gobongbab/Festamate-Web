import React from 'react';

import { Card } from '@/shared/ui';

export default function GroupCarousel({ label }: { label: string }) {
  const arr = Array.from({ length: 7 });

  return (
    <div className='flex w-full flex-col gap-y-3'>
      <div className='flex items-baseline justify-between gap-x-2'>
        <span className='text-lg font-semibold'>{label}</span>
        <span className='text-light hover:text-dark cursor-pointer text-sm'>
          <u>더보기</u>
        </span>
      </div>
      <div className='scrollbar-hide h-card-height flex items-center gap-x-3 overflow-x-scroll'>
        {arr.map((_, i) => (
          <Card key={i} />
        ))}
      </div>
    </div>
  );
}
