import React from 'react';

import { FormItem } from '@/shared/ui';
import { RoomCarousel } from '@/widgets/room-carousel';
import { MODAL } from '@/shared/constants';
import { useModal } from '@/shared/hook';
import { REQUEST } from '@/shared/api';
import { useGetRoomList } from '@/screen/home/api';

import { logout } from '@/screen/user/utils';
import { UserProfile } from '@/screen/user/ui';

export default function UserContainer() {
  const { openModal } = useModal();
  const {
    data: participatedData,
    isLoading: isParticipatedLoading,
    isError: isParticipatedError,
  } = useGetRoomList(REQUEST.ROOM_PARTICIPATED);

  const participatedRooms = participatedData
    ? participatedData.content
    : [];

  return (
    <>
      <UserProfile />
      <RoomCarousel
        label='참여한 모임'
        request={REQUEST.ROOM_PARTICIPATED}
        rooms={participatedRooms}
        isLoading={isParticipatedLoading}
        isError={isParticipatedError}
      />
      <FormItem title='쿠폰'>
        <button
          name='registerCoupon'
          className='flex w-full cursor-pointer justify-start focus:outline-none'
          onClick={() => openModal(MODAL.REGISTER_TICKET)}
        >
          쿠폰 등록하기
        </button>
      </FormItem>
      <div className='bg-sub h-[1px] w-full flex-shrink-0' />
      <FormItem title='커뮤니티'>
        <button className='flex w-full cursor-pointer justify-start focus:outline-none'>
          제재 내역
        </button>
      </FormItem>
      <div className='bg-sub h-[1px] w-full flex-shrink-0' />
      <FormItem title='기타'>
        <button
          name='termOfService'
          className='flex w-full cursor-pointer justify-start focus:outline-none'
          onClick={() => openModal(MODAL.TERM_OF_SERVICE)}
        >
          이용 약관
        </button>
        <button
          name='logout'
          className='mb-dock-height text-important flex w-full cursor-pointer justify-start focus:outline-none'
          onClick={() => logout()}
        >
          로그아웃
        </button>
      </FormItem>
    </>
  );
}
