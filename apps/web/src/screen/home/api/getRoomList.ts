import { useQuery } from '@tanstack/react-query';

import { RoomListItem } from '@/shared/types';
import { userGet } from '@/shared/api';

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

const getRoomList = async (request: string) => {
  const response = await userGet<FetchRoomListResponse>({
    request: request,
  });
  return response.data.result;
};

export const useGetRoomList = (request: string) => {
  return useQuery({
    queryKey: [`room-list-${request}`],
    queryFn: () => getRoomList(request),
  });
};
