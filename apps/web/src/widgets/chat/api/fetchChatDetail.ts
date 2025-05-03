import { useInfiniteQuery } from '@tanstack/react-query';

import { REQUEST, userGet } from '@/shared/api';
import { getPath } from '@festamate/utils';
import { Message } from '../types';

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

interface ChatResponse {
  isSuccess: boolean;
  message: string;
  result: {
    size: number;
    content: Message[];
    number: number;
    sort: Sort;
    pageable: Pageable;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  };
}

const fetchChatDetail = async (chatRoomId: number, pageParam: number = 0) => {
  const response = await userGet<ChatResponse>({
    request: getPath(REQUEST.CHAT_ROOM, `${chatRoomId}`),
    params: {
      page: pageParam,
      size: 2000,
    },
  });
  return response.data;
};

export const useFetchChatDetail = (chatRoomId: number) => {
  return useInfiniteQuery({
    queryKey: ['chatDetail', chatRoomId],
    queryFn: ({ pageParam = 0 }) => fetchChatDetail(chatRoomId, pageParam),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (!lastPage.result.last) {
        return lastPage.result.pageable.pageNumber + 1;
      }
      return undefined;
    },
  });
};
