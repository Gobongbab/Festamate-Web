import { get, REQUEST } from '@/shared/api';
import { RoomListItem } from '../types';

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

export const fetchRooms = async ({ pageParam = 0 }) => {
  const response = await get<FetchRoomListResponse>({
    request: REQUEST.ROOM,
    params: { page: pageParam, size: 20 },
  });
  return response.data.result;
};
