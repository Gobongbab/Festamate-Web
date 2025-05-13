import { useInfiniteQuery } from '@tanstack/react-query';

import { get, REQUEST, userGet } from '@/shared/api';
import { RoomListItem } from '@/shared/types';

interface FetchRoomProps {
  pageParam: number;
  request: string;
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

const fetchRooms = async ({ pageParam = 0, request }: FetchRoomProps) => {
  let response;
  if (request === REQUEST.ROOM_RECOMMENDED || REQUEST.ROOM_PARTICIPATED) {
    response = await userGet<FetchRoomListResponse>({
      request: request,
      params: { page: pageParam, size: 20 },
    });
  } else {
    response = await get<FetchRoomListResponse>({
      request: request,
      params: { page: pageParam, size: 20 },
    });
  }

  return response.data.result;
};

export const useInfiniteRooms = (request: string) => {
  return useInfiniteQuery({
    queryKey: ['rooms', request],
    queryFn: ({ pageParam }) => fetchRooms({ pageParam, request }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage.last || lastPage.empty) return undefined;
      return lastPage.pageable.pageNumber + 1;
    },
  });
};
