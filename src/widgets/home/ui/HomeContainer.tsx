import React from 'react';

import { GroupCarousel, GroupList } from '@/shared/ui';
import { PATH } from '@/shared/constants';
import { REQUEST } from '@/shared/api';
import { BoothInfoBg } from '@/assets/images';

export default function HomeContainer() {
  return (
    <>
      <BoothInfo />
      <GroupCarousel
        label='추천 모임방'
        key='openedGroup'
        to={PATH.LIST}
        request={REQUEST.ROOM}
        covered
      />
      <GroupList
        label='개설된 모임방'
        key='popularGroup'
        request={REQUEST.ROOM}
        to={PATH.LIST}
      />
    </>
  );
}

const BoothInfo = () => (
  <div
    className='rounded-10 p-normal-spacing relative flex h-fit w-full flex-col gap-y-2 bg-cover bg-center text-white'
    style={{ backgroundImage: `url(${BoothInfoBg})` }}
  >
    <div className='rounded-10 absolute inset-0 bg-black/30' />
    <div className='z-1 flex items-baseline justify-between'>
      <span className='agbalumo-regular text-xl font-bold'>Festamate!</span>
      <span className='hover:text-dark cursor-pointer text-sm text-white'>
        <u>위치보기</u>
      </span>
    </div>
    <span className='z-1 text-xl font-semibold'>부스에 방문해보세요!</span>
  </div>
);
