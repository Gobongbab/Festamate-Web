import React from 'react';
import { useAtomValue } from 'jotai';

import { fetchLoginStatus } from '@festamate/utils';

import { RoomList } from '@/widgets/room-list';
import { RoomCarousel } from '@/widgets/room-carousel';
import { REQUEST } from '@/shared/api';
import { useGetRoomList } from '@/screen/home/api';
import { userAtom } from '@/shared/atom';

import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';

export default function HomeContainer() {
  const isLogin = fetchLoginStatus();
  const user = useAtomValue(userAtom);

  const { data, isLoading, isError } = useGetRoomList(REQUEST.ROOM);
  const {
    data: recommendedData,
    isLoading: isRecommendedLoading,
    isError: isRecommendedError,
  } = useGetRoomList(REQUEST.ROOM_RECOMMENDED);

  const rooms = data ? data.content : [];
  const recommendedRooms = recommendedData ? recommendedData.content : [];

  return (
    <>
      <BoothInfo />
      <RoomCarousel
        label={
          isLogin && user ? `${user.nickname}님을 위한 추천 모임` : '추천 모임'
        }
        key='openedGroup'
        request={REQUEST.ROOM_RECOMMENDED}
        covered={!fetchLoginStatus()}
        rooms={recommendedRooms}
        isLoading={isRecommendedLoading}
        isError={isRecommendedError}
      />
      <RoomList
        label='개설된 모임'
        key='popularGroup'
        request={REQUEST.ROOM}
        rooms={rooms}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
}

const BoothInfo = () => (
  <button
    className='rounded-10 p-normal-spacing relative flex h-fit w-full flex-col gap-y-1 bg-cover bg-center text-white focus:outline-none'
    style={{
      backgroundImage: `url('https://i.pinimg.com/736x/67/a7/a2/67a7a2316cfa18d84af9f03cf11b0919.jpg')`,
    }}
    onClick={() =>
      window.open('https://www.instagram.com/festamate/', '_blank')
    }
  >
    <div className='rounded-10 absolute inset-0 bg-black/30' />
    <div className='z-1 flex w-full items-center justify-between'>
      <span className='agbalumo-regular text-xl font-bold'>Festamate!</span>
      <div className='flex items-center gap-1 text-sm'>
        바로가기
        <HiMiniArrowTopRightOnSquare size={16} />
      </div>
    </div>
    <span className='z-1 text-start text-lg font-semibold'>
      인스타그램에서 이벤트를 확인해보세요!
    </span>
  </button>
);
