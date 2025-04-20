import { useMutation } from '@tanstack/react-query';

import { REQUEST } from '@/shared/api';
import { userPost } from '@/shared/api/user';

import { useRoomCreateContext } from '@/widgets/create/model';

const submitRoomCreation = async (data: FormData) => {
  await userPost<FormData>({
    request: REQUEST.ROOM,
    data: data,
  });
};

export const useFormSubmit = () => {
  const { setMode } = useRoomCreateContext();

  return useMutation<unknown, unknown, FormData>({
    mutationFn: data => submitRoomCreation(data),
    onSuccess: () => setMode(prev => prev + 1),
    onError: () => alert('모임방 생성에 실패했어요.'),
  });
};
