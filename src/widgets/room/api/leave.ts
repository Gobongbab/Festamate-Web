import { useMutation } from '@tanstack/react-query';

import { REQUEST, userPost } from '@/shared/api';

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
