import { get, REQUEST } from '@/shared/api';
import { RoomDetail } from '@/shared/types';
import { getCookie } from '@/shared/utils';
import { useQuery } from '@tanstack/react-query';

interface FetchRoomResponse {
  result: RoomDetail;
}

export const fetchRoomDetail = async ({ roomId }: { roomId: number }) => {
  const response = await get<FetchRoomResponse>({
    request: REQUEST.ROOM + '/' + roomId,
    headers: { Authorization: `Bearer ${getCookie()}` },
  });
  return response.data.result;
};

export const useRoomDetail = (roomId: number) => {
  return useQuery({
    queryKey: [`room + ${roomId}`],
    queryFn: () => fetchRoomDetail({ roomId }),
  });
};
