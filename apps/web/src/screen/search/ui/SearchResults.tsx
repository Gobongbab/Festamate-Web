import React from 'react';

import { RoomListInfinite } from '@/widgets/room-list';
import { useBottomSheet } from '@/shared/hook';
import { BOTTOM_SHEET } from '@/shared/constants';

import { useGetSearchResults } from '@/screen/search/api';
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
  const {
    data,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
    refetch,
  } = useGetSearchResults(searchKey, { ...filter });
  const { openBottomSheet } = useBottomSheet();

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

      <div className='flex flex-col gap-1.5'>
        <RoomListInfinite
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
        />
      </div>
    </>
  );
}
