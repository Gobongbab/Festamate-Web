import { REQUEST, userGet } from '@/shared/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ChatRoom } from '../types';

interface ChatRoomResponse {
  isSuccess: boolean;
  message: string;
  result: {
    size: number;
    content: ChatRoom[];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    pageable: {
      offset: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      paged: boolean;
      pageNumber: number;
      pageSize: number;
      unpaged: boolean;
    };
    first: boolean;
    last: boolean;
    empty: boolean;
  };
}

const fetchChatRooms = async (pageParam: number = 0) => {
  const response = await userGet<ChatRoomResponse>({
    request: REQUEST.CHAT_ROOM_LIST,
    params: {
      page: pageParam,
      size: 20,
    },
  });
  return response.data;
};

export const useFetchChatRooms = () => {
  return useInfiniteQuery({
    queryKey: ['chatRooms'],
    queryFn: ({ pageParam = 0 }) => fetchChatRooms(pageParam),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (!lastPage.result.last) {
        return lastPage.result.pageable.pageNumber + 1;
      }
      return undefined;
    },
  });
};
