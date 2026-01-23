import { useMutation } from '@tanstack/react-query';

import { REQUEST, userPost } from '@/shared/api';

import { useGetUserRoomDetail } from '@/screen/room/api';

const postRoomLeave = async (roomId: number) => {
  await userPost({
    request: REQUEST.ROOM_LEAVE.split('{roomId}')
      .join(roomId.toString())
      .toString(),
  });
};

export const usePostRoomLeave = (roomId: number) => {
  const { refetch } = useGetUserRoomDetail(roomId);

  return useMutation({
    mutationFn: postRoomLeave,
    onSuccess: () => refetch(),
  });
};
