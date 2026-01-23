import { useQuery } from '@tanstack/react-query';

import { userGet, REQUEST } from '@/shared/api';
import { RoomDetail } from '@/shared/types';
import { getPath } from '@festamate/utils';

interface FetchRoomResponse {
  result: RoomDetail;
}

const getUserRoomDetail = async ({ roomId }: { roomId: number }) => {
  const response = await userGet<FetchRoomResponse>({
    request: getPath(REQUEST.ROOM, `${roomId}`),
  });
  return response.data.result;
};

export const useGetUserRoomDetail = (roomId: number) => {
  return useQuery({
    queryKey: ['roomDetail', roomId],
    queryFn: () => getUserRoomDetail({ roomId }),
  });
};
