import { useMutation } from '@tanstack/react-query';

import { REQUEST } from '@/shared/api';
import { userPost } from '@/shared/api/user';

import { useUserRoomDetail } from '@/widgets/room/api';

const submitLeaveRoom = async (roomId: number) => {
  await userPost({
    request: REQUEST.ROOM_LEAVE.split('{roomId}')
      .join(roomId.toString())
      .toString(),
  });
};

export const useLeaveRoom = (roomId: number) => {
  const { refetch } = useUserRoomDetail(roomId);

  return useMutation({
    mutationFn: submitLeaveRoom,
    onSuccess: () => refetch(),
  });
};
