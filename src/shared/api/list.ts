import { useInfiniteQuery } from '@tanstack/react-query';

import { get, REQUEST } from '@/shared/api';
import { RoomListItem } from '@/shared/types';
import { getCookie } from '@/shared/utils';

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

const fetchRooms = async ({ pageParam = 0 }) => {
  const response = await get<FetchRoomListResponse>({
    request: REQUEST.ROOM,
    params: { page: pageParam, size: 20 },
    headers: { Authorization: `Bearer ${getCookie()}` },
  });
  return response.data.result;
};

export const useInfiniteRooms = () => {
  return useInfiniteQuery({
    queryKey: ['rooms'],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchRooms({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
  });
};
