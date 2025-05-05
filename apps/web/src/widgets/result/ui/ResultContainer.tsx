import React, { useCallback, useEffect, useRef } from 'react';

import { cn } from '@festamate/utils';

import { ListItem } from '@/shared/ui';
import { useBottomSheet } from '@/shared/hook';
import {
  BOTTOM_SHEET,
  GENDER_LABEL,
  PARTICIPANTS,
  ROOM_STATUS,
} from '@/shared/constants';

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
  const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteRoomsWithFilters({ ...filter });
  const { openBottomSheet } = useBottomSheet();

  const observer = useRef<IntersectionObserver | undefined>(undefined);
  const lastRoomRef = useCallback(
    (node: HTMLElement | null) => {
      if (!hasNextPage || isLoading || isFetchingNextPage) {
        if (observer.current) {
          observer.current.disconnect();
          observer.current = undefined;
        }
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            console.log('Fetching next page...', {
              hasNextPage,
              isFetchingNextPage,
              currentPage: data?.pages.length,
            });
            fetchNextPage();
          }
        },
        { threshold: 0.7 },
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [
      isLoading,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      data?.pages.length,
    ],
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const rooms = data
    ? data.pages
        .flatMap(page => page.content)
        .filter(room => room.title.includes(searchKey))
    : [];

  return (
    <>
      <div className='flex flex-col gap-2'>
        {searchKey.length > 0 && (
          <p className='text-lg'>
            "<b>{searchKey}</b>" 에 대한 검색 결과입니다.
          </p>
        )}
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
              <span className='text-xs'>({GENDER_LABEL[filter.gender]})</span>
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
              <span className='text-xs'>
                ({PARTICIPANTS[filter.participants]})
              </span>
            )}
          </button>
        </div>
      </div>

      {data && rooms.length > 0 ? (
        <div className='flex flex-col gap-1.5'>
          {rooms.map((room, index) => (
            <ListItem
              key={room.id}
              {...room}
              ref={index === rooms.length - 1 ? lastRoomRef : null}
            />
          ))}
        </div>
      ) : (
        <div className='text-light grid h-30 w-full place-items-center'>
          <span>검색 결과가 없어요!</span>
        </div>
      )}
    </>
  );
}
