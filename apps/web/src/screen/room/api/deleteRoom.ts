import { useMutation } from '@tanstack/react-query';

import { REQUEST, userDel } from '@/shared/api';
import { useGetRoomList } from '@/screen/home/api';
import { getPath } from '@festamate/utils';

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
  const { refetch } = useGetRoomList(REQUEST.ROOM);

  return useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      refetch();
      window.location.replace(`${import.meta.env.VITE_PRODUCTION_URL}`);
    },
  });
};
