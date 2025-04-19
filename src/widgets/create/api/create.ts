import { useMutation } from '@tanstack/react-query';

import { REQUEST } from '@/shared/api';
import { userPost } from '@/shared/api/user';
import { Room } from '@/shared/types';

import { useRoomCreateContext } from '@/widgets/create/model';

const submitRoomCreation = async (data: Room) => {
  await userPost<Room>({
    request: REQUEST.ROOM,
    data: data,
  });
};

export const useFormSubmit = () => {
  const { setMode } = useRoomCreateContext();

  return useMutation<unknown, unknown, Room>({
    mutationFn: data => submitRoomCreation(data),
    onSuccess: () => setMode(prev => prev + 1),
    onError: () => alert('모임방 생성에 실패했어요.'),
  });
};
