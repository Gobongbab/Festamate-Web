import { useInfiniteQuery } from '@tanstack/react-query';

import { get, REQUEST } from '@/shared/api';
import type { RoomListItem } from '@/shared/types';
import type { Filter } from '@/widgets/result/types';

interface FetchRoomListProps {
  pageParam: number;
  filter?: Filter;
}

interface FetchRoomListResponse {
  result: {
    content: RoomListItem[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
      };
      offset: number;
      unpaged: boolean;
      paged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    numberOfElements: number;
    empty: boolean;
  };
}

const fetchRoomsWithFilters = async ({
  pageParam = 0,
  filter,
}: FetchRoomListProps) => {
  const response = await get<FetchRoomListResponse>({
    request: REQUEST.ROOM,
    params: {
      page: pageParam,
      size: 20,
      ...filter,
    },
  });
  return response.data.result;
};

export const useInfiniteRoomsWithFilters = (
  filter?: FetchRoomListProps['filter'],
) => {
  return useInfiniteQuery({
    queryKey: ['rooms', filter],
    queryFn: ({ pageParam }) => fetchRoomsWithFilters({ pageParam, filter }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage.last || lastPage.empty) return undefined;
      return lastPage.pageable.pageNumber + 1;
    },
  });
};
