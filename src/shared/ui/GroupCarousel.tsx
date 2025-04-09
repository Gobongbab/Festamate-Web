import React from 'react';

import { useFlow } from '@/app/stackflow';

import { Button, Card } from '@/shared/ui';
import { PathItem, RoomListItem } from '@/shared/types';
import { cn } from '@/shared/utils';
import { REQUEST, useRoomList } from '@/shared/api';
import { PATH } from '@/shared/constants';

interface GroupCarouselProps {
  label: string;
  to: PathItem;
  covered?: boolean;
  request: string;
}
export default function GroupCarousel({
  label,
  to,
  covered = false,
  request,
}: GroupCarouselProps) {
  const { data } = useRoomList(request);
  const { push } = useFlow();

  let rooms;

  if (request === REQUEST.ROOM_PARTICIPATED)
    /**내가 참여한 모임방의 응답은 content 없이 바로 주어져 다음과 같이 작성하였습니다 */
    rooms = (data as unknown as RoomListItem[]) || [];
  else rooms = data ? data.content : [];

  return (
    <div className='flex w-full flex-col gap-y-3'>
      <div className='flex items-baseline justify-between gap-x-2'>
        <span className='text-lg font-semibold'>{label}</span>
        <button
          name='more'
          className='focus;outline-none text-light hover:text-dark cursor-pointer text-sm'
          onClick={() => push(to, { title: label })}
          disabled={covered}
        >
          <u>더보기</u>
        </button>
      </div>
      <div
        className={cn(
          'scrollbar-hide h-card-height rounded-10 relative flex items-center gap-x-3',
          covered ? 'overflow-hidden' : 'overflow-x-scroll',
        )}
      >
        {data && (
          <>
            {rooms.length === 0 ? (
              <div className='grid h-30 w-full place-items-center'>
                {label}이 없어요!
              </div>
            ) : (
              rooms.map(room => <Card key={room.id} {...room} />)
            )}
          </>
        )}
        {covered && (
          <div className='absolute inset-0 z-20 grid size-full place-items-center bg-black/1 backdrop-blur-sm'>
            <div className='flex flex-col items-center gap-2'>
              <p className='text-center text-white'>
                간편 로그인을 통해 로그인하고,
                <br />
                추천 모임방을 확인하세요!
              </p>
              <Button
                name='next-step'
                size='sm'
                onClick={() => push(PATH.LOGIN, {})}
                label='로그인 하러가기'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
