import React from 'react';

import { Button, FormItem } from '@/shared/ui';
import { RoomListItem } from '@/shared/types';

import { RoomHeader, UserItem } from '@/widgets/room/ui';
import { useRoomDetail } from '@/widgets/room/api';
import { fetchLoginStatus } from '@/shared/utils';
import { useBottomSheet, useModal } from '@/shared/hook';
import { BOTTOM_SHEET, MODAL } from '@/shared/constants';

export default function RoomContainer(props: RoomListItem) {
  const { id, content, maxParticipants } = props;
  const { data, isLoading } = useRoomDetail(id);
  const { openBottomSheet } = useBottomSheet();
  const { openModal } = useModal();
  const isLogin = fetchLoginStatus();
  const isOneToOne = maxParticipants === 2;

  const handleJoin = () => {
    if (isLogin) openModal(MODAL.JOIN);
    else openBottomSheet(BOTTOM_SHEET.LOGIN);
  };
  const handleJoinWithFriend = () => {
    if (isLogin) openModal(MODAL.JOIN_WITH_FRIEND);
    else openBottomSheet(BOTTOM_SHEET.LOGIN);
  };

  return (
    <div className='flex size-full flex-col justify-between'>
      <div className='scrollbar-hide flex flex-col gap-y-6 overflow-scroll'>
        <RoomHeader {...props} />
        <div className='border-sub flex h-fit w-full border-y-1 py-6'>
          {content}
        </div>
        {isLoading && (
          <>
            <FormItem title='모임을 연 멤버'>
              <div className='skeleton h-15 w-full'></div>
            </FormItem>
            <FormItem title='모임에 참여한 멤버'>
              <div className='skeleton h-15 w-full'></div>
            </FormItem>
          </>
        )}
        {!isLoading && data && (
          <>
            <FormItem
              title='모임을 연 멤버'
              className='border-sub border-b-1 pb-6'
            >
              {data.hostParticipants.map(m => (
                <UserItem {...m} key={m.id} />
              ))}
            </FormItem>
            <FormItem title='모임에 참여한 멤버'>
              {data.guestParticipants.map(m => {
                if (!m.isHost) return <UserItem {...m} key={m.id} />;
              })}
              {data.guestParticipants.length === 0 && (
                <div className='text-light grid h-20 w-full place-items-center font-light'>
                  아직 참여한 멤버가 없어요!
                </div>
              )}
            </FormItem>
          </>
        )}
        <div className='h-normal-spacing' />
      </div>
      <div className='border-t-app-bar-border z-30 flex h-fit w-full gap-x-3 border-[0.5px] pt-3 text-lg font-semibold text-white'>
        <Button
          name='room-participate'
          label='참여하기'
          halfWidth={!isOneToOne}
          onClick={handleJoin}
        />
        {!isOneToOne && (
          <Button
            name='room-participate-with-friend'
            label='친구와 함께 참여하기'
            halfWidth
            onClick={handleJoinWithFriend}
          />
        )}
      </div>
    </div>
  );
}
