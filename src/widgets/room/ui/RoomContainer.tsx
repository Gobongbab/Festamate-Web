import React from 'react';
import { useSetAtom } from 'jotai';

import { Button, FormItem, ListItem } from '@/shared/ui';
import { RoomListItem } from '@/shared/types';

import { UserItem } from '@/widgets/room/ui';
import { useRoomDetail } from '@/widgets/room/api';
import { fetchLoginStatus } from '@/shared/utils';
import { bottomSheetAtom } from '@/shared/atom';

export default function RoomContainer(props: RoomListItem) {
  const { id, content } = props;
  const { data, isLoading } = useRoomDetail(id);
  const setIsOpen = useSetAtom(bottomSheetAtom);
  const isLogin = fetchLoginStatus();

  const handleJoin = () => {
    if (isLogin) console.log('참여하기 모달이 열립니다.');
    else setIsOpen(true);
  };

  return (
    <div className='flex size-full flex-col justify-between'>
      <div className='scrollbar-hide flex flex-col gap-y-6 overflow-scroll'>
        <ListItem {...props} header />
        <div className='border-sub flex h-fit w-full border-b-2 pb-6'>
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
            <FormItem title='모임을 연 멤버'>
              {data?.hostParticipants.map(m => <UserItem {...m} key={m.id} />)}
            </FormItem>
            <FormItem title='모임에 참여한 멤버'>
              {data?.guestParticipants.map(m => {
                if (!m.isHost) return <UserItem {...m} key={m.id} />;
              })}
            </FormItem>
          </>
        )}
        <div className='h-normal-spacing' />
      </div>
      <div className='z-30 flex h-fit w-full gap-x-3 text-lg font-semibold text-white'>
        <Button
          name='room-participate'
          label='참여하기'
          halfWidth
          onClick={handleJoin}
        />
        <Button
          name='room-participate-with-friend'
          label='친구와 함께 참여하기'
          halfWidth
          onClick={handleJoin}
        />
      </div>
    </div>
  );
}
