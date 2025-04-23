import { useMutation } from '@tanstack/react-query';

import { REQUEST, userDel, useRoomList } from '@/shared/api';
import { getPath } from '@/shared/utils';

interface DeleteRoomResponse {
  isSuccess: boolean;
  message: string;
}

const deleteRoom = async (roomId: number) => {
  await userDel<DeleteRoomResponse>({
    request: getPath(REQUEST.ROOM, `${roomId}`),
  });
};

export const useDeleteRoom = () => {
  const { refetch } = useRoomList(REQUEST.ROOM);

  return useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      refetch();
      window.location.replace(`${import.meta.env.VITE_PRODUCTION_URL}`);
    },
  });
};
