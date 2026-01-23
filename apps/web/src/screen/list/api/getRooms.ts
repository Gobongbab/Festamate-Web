import { useInfiniteQuery } from '@tanstack/react-query';

import { get, REQUEST, userGet } from '@/shared/api';
import { RoomListItem, BasePagedResponse } from '@/shared/types';

interface GetRoomsProps {
  pageParam: number;
  request: string;
}

const getRooms = async ({ pageParam = 0, request }: GetRoomsProps) => {
  let response;
  if (request === REQUEST.ROOM_RECOMMENDED || REQUEST.ROOM_PARTICIPATED) {
    response = await userGet<BasePagedResponse<RoomListItem>>({
      request: request,
      params: { page: pageParam, size: 20 },
    });
  } else {
    response = await get<BasePagedResponse<RoomListItem>>({
      request: request,
      params: { page: pageParam, size: 20 },
    });
  }

  return response.data.result;
};

export const useGetRooms = (request: string) => {
  return useInfiniteQuery({
    queryKey: ['rooms', request],
    queryFn: ({ pageParam }) => getRooms({ pageParam, request }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage.last || lastPage.empty) return undefined;
      return lastPage.pageable.pageNumber + 1;
    },
  });
};
