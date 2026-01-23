import React, { useCallback, useEffect, useRef } from 'react';

import { ListItem } from '@/entities/list/ui';
import { useBottomSheet } from '@/shared/hook';
import { BOTTOM_SHEET } from '@/shared/constants';

import { useInfiniteRoomsWithFilters } from '@/screen/search/api';
import { Filter } from '@/screen/search/types';
import { SearchFilterTag } from '@/screen/search/ui';

interface SearchResultsParams {
  searchKey: string;
  filter: Filter;
}

export default function SearchResults({
  searchKey,
  filter,
}: SearchResultsParams) {
  const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteRoomsWithFilters(searchKey, { ...filter });
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

  const rooms = data ? data.pages.flatMap(page => page.content) : [];

  return (
    <>
      <div className='flex flex-col gap-2'>
        {searchKey.length > 0 && (
          <p className='text-lg'>
            "<b>{searchKey}</b>" 에 대한 검색 결과입니다.
          </p>
        )}
        <div className='flex w-full items-center gap-2'>
          <SearchFilterTag
            onClick={() => {
              openBottomSheet(BOTTOM_SHEET.FILTER_STATUS);
            }}
            label='매칭 상태'
            filter={filter}
          />
          <SearchFilterTag
            onClick={() => {
              openBottomSheet(BOTTOM_SHEET.FILTER_GENDER);
            }}
            label='모집 성별'
            filter={filter}
          />
          <SearchFilterTag
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
