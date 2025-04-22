import { useMutation } from '@tanstack/react-query';

import { useFlow } from '@/app/stackflow';

import { REQUEST, useRoomList, userPost } from '@/shared/api';

const submitRoomCreation = async (data: FormData) => {
  await userPost<FormData>({
    request: REQUEST.ROOM,
    data: data,
  });
};

export const useFormSubmit = () => {
  const { pop } = useFlow();
  const { refetch } = useRoomList(REQUEST.ROOM);

  return useMutation<unknown, unknown, FormData>({
    mutationFn: data => submitRoomCreation(data),
    onSuccess: () => {
      refetch();
      pop();
    },
    onError: () => alert('모임방 생성에 실패했어요.'),
  });
};
