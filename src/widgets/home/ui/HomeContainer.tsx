import React from 'react';

import { GroupCarousel } from '@/shared/ui';
import { ListItem } from '@/shared/ui';

export default function HomeContainer() {
  const arr = Array.from({ length: 4 });

  return (
    <>
      <BoothInfo />
      <GroupCarousel label='개설된 모임방' key='openedGroup' />
      <div className='flex w-full flex-col gap-y-3'>
        <div className='flex items-baseline justify-between gap-x-2'>
          <span className='text-lg font-semibold'>참여한 모임방</span>
          <span className='text-light hover:text-dark cursor-pointer text-sm'>
            <u>더보기</u>
          </span>
        </div>
        <div className='flex flex-col items-center gap-1.5'>
          {arr.map((_, i) => (
            <ListItem key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

const BoothInfo = () => (
  <div className='rounded-10 from-primary/50 to-primary-hover/90 p-normal-spacing flex h-fit w-full flex-col gap-y-2 bg-gradient-to-r text-white'>
    <div className='flex items-baseline justify-between'>
      <span className='agbalumo-regular text-xl font-bold'>Festamate!</span>
      <span className='hover:text-dark cursor-pointer text-sm text-white'>
        <u>위치보기</u>
      </span>
    </div>
    <span className='text-xl font-semibold'>부스에 방문해보세요!</span>
  </div>
);
