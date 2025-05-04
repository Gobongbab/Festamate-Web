import { useMutation } from '@tanstack/react-query';

import { useFlow } from '@/app/stackflow';

import { REQUEST, useFetchUserInfo, useRoomList, userPost } from '@/shared/api';

interface FriendPhoneResponse {
  isSuccess: boolean;
  message: string;
  result: {
    exist: boolean;
  };
}

const submitRoomCreation = async (data: FormData) => {
  await userPost<FormData>({
    request: REQUEST.ROOM,
    data: data,
  });
};

const submitFriendPhone = async (data: string) => {
  const response = await userPost<{ phoneNumber: string }, FriendPhoneResponse>(
    {
      request: REQUEST.CERTIFY_USER,
      data: { phoneNumber: data },
    },
  );
  return response.data;
};

export const useFormSubmit = () => {
  const { pop } = useFlow();
  const { refetch } = useRoomList(REQUEST.ROOM);
  const { refetch: fetchUserInfo } = useFetchUserInfo();

  return useMutation<unknown, unknown, FormData>({
    mutationFn: data => submitRoomCreation(data),
    onSuccess: () => {
      refetch();
      fetchUserInfo();
      pop();
    },
    onError: () => alert('모임 생성에 실패했어요.'),
  });
};

export const useSubmitFriendPhone = () => {
  return useMutation<FriendPhoneResponse, unknown, string>({
    mutationFn: submitFriendPhone,
  });
};
