import { useInfiniteQuery } from '@tanstack/react-query';

import { REQUEST, userGet } from '@/shared/api';
import { getPath } from '@festamate/utils';
import { BaseApiPagedResponse } from '@/shared/types';
import { Message } from '@/screen/chat/types';

const getChatDetail = async (chatRoomId: number, pageParam: number = 0) => {
  const response = await userGet<BaseApiPagedResponse<Message>>({
    request: getPath(REQUEST.CHAT_ROOM, `${chatRoomId}`),
    params: {
      page: pageParam,
      size: 20,
    },
  });
  return response.data;
};

export const useGetChatDetail = (chatRoomId: number) => {
  return useInfiniteQuery({
    queryKey: ['chatDetail', chatRoomId],
    queryFn: ({ pageParam = 0 }) => getChatDetail(chatRoomId, pageParam),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (!lastPage.result.last) {
        return lastPage.result.pageable.pageNumber + 1;
      }
      return undefined;
    },
  });
};
