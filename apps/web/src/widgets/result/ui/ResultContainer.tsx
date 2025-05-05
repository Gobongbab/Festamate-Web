import React from 'react';

import { cn } from '@festamate/utils';

import { ListItem } from '@/shared/ui';
import { useBottomSheet } from '@/shared/hook';
import { BOTTOM_SHEET, ROOM_STATUS } from '@/shared/constants';

import { useInfiniteRoomsWithFilters } from '@/widgets/result/api';
import { Filter } from '@/widgets/result/types';

interface ResultContainerParams {
  searchKey: string;
  filter: Filter;
}

export default function ResultContainer({
  searchKey,
  filter,
}: ResultContainerParams) {
  const { data } = useInfiniteRoomsWithFilters({ ...filter });
  const { openBottomSheet } = useBottomSheet();

  return (
    <>
      <div className='flex flex-col gap-2'>
        <p className='text-lg'>
          "<b>{searchKey}</b>" 에 대한 검색 결과입니다.
        </p>
        <div className='flex w-full items-center gap-1'>
          <button
            className={cn(
              'border-border flex w-fit cursor-pointer items-center gap-1 rounded-full border-[1px] px-3 py-1.5 text-sm',
              filter.status && 'bg-point text-white',
            )}
            onClick={() => {
              openBottomSheet(BOTTOM_SHEET.FILTER_STATUS);
            }}
          >
            매칭 상태
            {filter.status && (
              <span className='text-xs'>({ROOM_STATUS[filter.status]})</span>
            )}
          </button>
          <button
            className={cn(
              'border-border flex w-fit cursor-pointer items-center gap-1 rounded-full border-[1px] px-3 py-1.5 text-sm',
              filter.gender && 'bg-point text-white',
            )}
            onClick={() => {
              openBottomSheet(BOTTOM_SHEET.FILTER_GENDER);
            }}
          >
            모집 성별
            {filter.gender && (
              <span className='text-xs'>({filter.gender})</span>
            )}
          </button>
          <button
            className={cn(
              'border-border flex w-fit cursor-pointer items-center gap-1 rounded-full border-[1px] px-3 py-1.5 text-sm',
              filter.participants && 'bg-point text-white',
            )}
            onClick={() => {
              openBottomSheet(BOTTOM_SHEET.FILTER_PARTICIPANTS);
            }}
          >
            모임 인원
            {filter.participants && (
              <span className='text-xs'>({filter.participants})</span>
            )}
          </button>
        </div>
      </div>

      {data && (
        <div className='flex flex-col gap-1.5'>
          {data.pages[0].content.map(room => (
            <ListItem key={room.id} {...room} />
          ))}
        </div>
      )}
    </>
  );
}
