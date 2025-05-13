import React from 'react';

import { cn } from '@festamate/utils';

import { useFlow } from '@/app/stackflow';
import { Button, Card, CardSkeleton } from '@/shared/ui';
import { RoomListItem } from '@/shared/types';
import { useBottomSheet } from '@/shared/hook';
import { BOTTOM_SHEET, PATH } from '@/shared/constants';
import { REQUEST, useRoomList } from '@/shared/api';

import { COVERED_ROOM_DATA } from '@/mock';
import { Error, Festa } from '@/assets/images';

interface GroupCarouselProps {
  label: string;
  covered?: boolean;
  request: string;
}
export default function GroupCarousel({
  label,
  covered = false,
  request,
}: GroupCarouselProps) {
  const { data, isError, isLoading } = useRoomList(request);
  const { push } = useFlow();
  const skeleton = Array.from({ length: 4 });

  let rooms;

  if (request === REQUEST.ROOM_PARTICIPATED)
    /**내가 참여한 모임의 응답은 content 없이 바로 주어져 다음과 같이 작성하였습니다 */
    rooms = (data as unknown as RoomListItem[]) || [];
  else rooms = data ? data.content : [];

  return (
    <div className='flex w-full flex-col gap-y-3'>
      <div className='flex items-baseline justify-between gap-x-2'>
        <span className='text-lg font-semibold'>{label}</span>
        <button
          name='more'
          className='focus;outline-none text-light hover:text-dark cursor-pointer text-sm'
          onClick={() => push(PATH.LIST, { title: label, request: request })}
          disabled={covered}
        >
          <u>더보기</u>
        </button>
      </div>
      {covered ? (
        <CoveredMockup />
      ) : (
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
          {isLoading &&
            skeleton.map((_, i) => <CardSkeleton key={`card-skeleton-${i}`} />)}
          {isError && (
            <div className='grid h-30 w-full items-center'>
              <div className='flex flex-col items-center justify-center gap-3'>
                <img src={Error} className='size-14' />
                <span> {label}을 불러오던 도중 오류가 발생했어요!</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const CoveredMockup = () => {
  const { openBottomSheet } = useBottomSheet();

  return (
    <div className='flex w-full flex-col gap-y-3'>
      <div className='scrollbar-hide h-card-height rounded-10 relative flex items-center gap-x-3 overflow-hidden'>
        {COVERED_ROOM_DATA.map(room => (
          <Card {...room} key={room.id} />
        ))}
        <div className='absolute inset-0 z-20 flex size-full items-center justify-center gap-3 bg-white/30 backdrop-blur-xs'>
          <img src={Festa} className='fixed -bottom-18 -left-12 size-60' />
          <div>
            <div className='rounded-5 ml-36 flex flex-col items-center gap-2'>
              <p className='text-dark font-medium'>
                간편 로그인을 통해 로그인하고,
                <br />
                추천 모임을 확인하세요!
              </p>
              <Button
                name='next-step'
                size='md'
                className='active:bg-point-hover'
                onClick={() => openBottomSheet(BOTTOM_SHEET.LOGIN)}
                label='로그인 하러가기'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
