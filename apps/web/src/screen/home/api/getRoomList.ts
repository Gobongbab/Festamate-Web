import { useQuery } from '@tanstack/react-query';

import { RoomListItem, BasePagedResponse } from '@/shared/types';
import { userGet } from '@/shared/api';

const getRoomList = async (request: string) => {
  const response = await userGet<BasePagedResponse<RoomListItem>>({
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
