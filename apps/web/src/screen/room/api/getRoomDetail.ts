import { useQuery } from '@tanstack/react-query';

import { get, REQUEST } from '@/shared/api';
import { RoomDetail } from '@/shared/types';
import { getPath } from '@festamate/utils';

interface FetchRoomResponse {
  result: RoomDetail;
}

const getRoomDetail = async ({ roomId }: { roomId: number }) => {
  const response = await get<FetchRoomResponse>({
    request: getPath(REQUEST.ROOM, `${roomId}`),
  });
  return response.data.result;
};

export const useGetRoomDetail = (roomId: number) => {
  return useQuery({
    queryKey: ['roomDetail', roomId],
    queryFn: () => getRoomDetail({ roomId }),
  });
};
