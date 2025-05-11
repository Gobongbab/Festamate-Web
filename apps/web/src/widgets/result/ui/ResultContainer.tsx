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

interface FilterButtonProps {
  onClick: () => void;
  label: string;
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
        <div className='flex w-full items-center gap-2'>
          <FilterButton
            onClick={() => {
              openBottomSheet(BOTTOM_SHEET.FILTER_STATUS);
            }}
            label='매칭 상태'
            filter={filter}
          />
          <FilterButton
            onClick={() => {
              openBottomSheet(BOTTOM_SHEET.FILTER_GENDER);
            }}
            label='모집 성별'
            filter={filter}
          />
          <FilterButton
            onClick={() => {
              openBottomSheet(BOTTOM_SHEET.FILTER_PARTICIPANTS);
            }}
            label='모임 인원'
            filter={filter}
          />
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

const FilterButton = ({ onClick, label, filter }: FilterButtonProps) => {
  const filterKey =
    label === '매칭 상태'
      ? 'status'
      : label === '모집 성별'
        ? 'gender'
        : 'participants';

  const getStatusText = () => {
    if (label === '매칭 상태' && filter.status) {
      return ROOM_STATUS[filter.status];
    }
    if (label === '모집 성별' && filter.gender) {
      return GENDER_LABEL[filter.gender];
    }
    if (label === '모임 인원' && filter.participants) {
      return PARTICIPANTS[filter.participants];
    }
    return null;
  };

  const status = getStatusText();

  return (
    <button
      className={cn(
        'border-border flex w-fit cursor-pointer items-center gap-1 rounded-full border-[1px] px-4 py-2 text-[13px]',
        filter[filterKey] && 'bg-point text-white',
      )}
      onClick={onClick}
    >
      {label} {status && <span className='text-xs'>{status}</span>}
    </button>
  );
};
