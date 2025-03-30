import React from 'react';

import { ListItem } from '@/shared/ui';
import { PathItem } from '../types';
import { useFlow } from '@/app/stackflow';

export default function GroupCarousel({
  label,
  to,
}: {
  label: string;
  to: PathItem;
}) {
  const arr = Array.from({ length: 4 });
  const { push } = useFlow();

  return (
    <div className='flex w-full flex-col gap-y-3'>
      <div className='flex items-baseline justify-between gap-x-2'>
        <span className='text-lg font-semibold'>{label}</span>
        <button
          name='more'
          className='text-light hover:text-dark cursor-pointer text-sm focus:outline-none'
          onClick={() => push(to, { title: label })}
        >
          <u>더보기</u>
        </button>
      </div>
      <div className='flex flex-col items-center gap-1.5'>
        {arr.map((_, i) => (
          <ListItem key={i} />
        ))}
      </div>
    </div>
  );
}
