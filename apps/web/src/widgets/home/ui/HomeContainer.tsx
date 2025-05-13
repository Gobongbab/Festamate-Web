import React from 'react';

import { GroupCarousel, GroupList } from '@/shared/ui';
import { REQUEST } from '@/shared/api';
import { fetchLoginStatus } from '@festamate/utils';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/shared/atom';

export default function HomeContainer() {
  const isLogin = fetchLoginStatus();
  const user = useAtomValue(userAtom);

  return (
    <>
      <BoothInfo />
      <GroupCarousel
        label={
          isLogin && user ? `${user.nickname}님을 위한 추천 모임` : '추천 모임'
        }
        key='openedGroup'
        request={REQUEST.ROOM_RECOMMENDED}
        covered={!fetchLoginStatus()}
      />
      <GroupList
        label='개설된 모임'
        key='popularGroup'
        request={REQUEST.ROOM}
      />
    </>
  );
}

const BoothInfo = () => (
  <div
    className='rounded-10 p-normal-spacing relative flex h-fit w-full flex-col gap-y-2 bg-cover bg-center text-white'
    style={{
      backgroundImage: `url('https://i.pinimg.com/736x/67/a7/a2/67a7a2316cfa18d84af9f03cf11b0919.jpg')`,
    }}
  >
    <div className='rounded-10 absolute inset-0 bg-black/30' />
    <div className='z-1 flex items-baseline justify-between'>
      <span className='agbalumo-regular text-xl font-bold'>Festamate!</span>
      <span className='hover:text-dark cursor-pointer text-sm text-white'>
        <u>위치보기</u>
      </span>
    </div>
    <span className='z-1 text-lg font-semibold'>부스에 방문해보세요!</span>
  </div>
);
