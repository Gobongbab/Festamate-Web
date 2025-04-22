import { useQuery } from '@tanstack/react-query';

import { get, REQUEST } from '@/shared/api';
import { userGet } from '@/shared/api/user';
import { RoomDetail } from '@/shared/types';
import { getPath } from '@/shared/utils';

interface FetchRoomResponse {
  result: RoomDetail;
}

const fetchUserRoomDetail = async ({ roomId }: { roomId: number }) => {
  const response = await userGet<FetchRoomResponse>({
    request: getPath(REQUEST.ROOM, `${roomId}`),
  });
  return response.data.result;
};
const fetchRoomDetail = async ({ roomId }: { roomId: number }) => {
  const response = await get<FetchRoomResponse>({
    request: getPath(REQUEST.ROOM, `${roomId}`),
  });
  return response.data.result;
};

export const useUserRoomDetail = (roomId: number) => {
  return useQuery({
    queryKey: [`room + ${roomId}`],
    queryFn: () => fetchUserRoomDetail({ roomId }),
  });
};

export const useRoomDetail = (roomId: number) => {
  return useQuery({
    queryKey: [`room + ${roomId}`],
    queryFn: () => fetchRoomDetail({ roomId }),
  });
};
