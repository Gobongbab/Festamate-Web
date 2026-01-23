import { REQUEST, userGet } from '@/shared/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { BaseApiPagedResponse } from '@/shared/types';
import { ChatRoom } from '@/screen/chat/types';

const getChatRooms = async (pageParam: number = 0) => {
  const response = await userGet<BaseApiPagedResponse<ChatRoom>>({
    request: REQUEST.CHAT_ROOM_LIST,
    params: {
      page: pageParam,
      size: 20,
    },
  });
  return response.data;
};

export const useGetChatRooms = () => {
  return useInfiniteQuery({
    queryKey: ['chatRooms'],
    queryFn: ({ pageParam = 0 }) => getChatRooms(pageParam),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (!lastPage.result.last) {
        return lastPage.result.pageable.pageNumber + 1;
      }
      return undefined;
    },
  });
};
