import React, { Dispatch, SetStateAction, useEffect } from 'react';

import { FormItem } from '@/shared/ui';
import { RoomAuthority, RoomListItem } from '@/shared/types';

import { RoomHeader, UserItem } from '@/widgets/room/ui';
import { useRoomDetail, useUserRoomDetail } from '@/widgets/room/api';
import { fetchLoginStatus } from '@festamate/utils';

type RoomContainerProps = RoomListItem & {
  setStatus: Dispatch<
    SetStateAction<{
      status: 'pending' | 'success';
      data: RoomAuthority | null;
    }>
  >;
};

export default function RoomContainer(props: RoomContainerProps) {
  const { id, content, setStatus } = props;
  const isLoggedIn = fetchLoginStatus();
  const roomDetail = isLoggedIn ? useUserRoomDetail : useRoomDetail;
  const { data, isLoading } = roomDetail(id);

  useEffect(() => {
    if (isLoading) setStatus(prev => ({ ...prev, status: 'pending' }));
    if (data)
      setStatus(() => ({ data: data.roomAuthority, status: 'success' }));
  }, [data, isLoading, setStatus]);

  return (
    <div className='flex size-full flex-col justify-between'>
      <div className='scrollbar-hide flex flex-col gap-y-6 overflow-scroll'>
        <RoomHeader {...props} />
        <div className='border-sub flex h-fit w-full flex-col border-y-1 py-6'>
          {content.split('\n').map(v => (
            <p key={v}>{v}</p>
          ))}
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
            <FormItem title='모임에 참여한 멤버' className='mb-[100px]'>
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
      </div>
    </div>
  );
}
