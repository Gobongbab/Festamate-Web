import React from 'react';

import { GroupCarousel, GroupList } from '@/shared/ui';
import { PATH } from '@/shared/constants';

export default function HomeContainer() {
  return (
    <>
      <BoothInfo />
      <GroupCarousel
        label='🤗 개설된 모임방'
        key='openedGroup'
        to={PATH.LIST}
      />
      <GroupList label='🔥 인기 모임방' key='popularGroup' to={PATH.LIST} />
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
