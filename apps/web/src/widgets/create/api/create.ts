import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { useFlow } from '@/app/stackflow';

import { REQUEST, useFetchUserInfo, useRoomList, userPost } from '@/shared/api';
import { errorMessageAtom } from '@/shared/atom';
import { MODAL } from '@/shared/constants';
import { useModal } from '@/shared/hook';
import { Gender } from '@/shared/types';

interface FriendPhoneResponse {
  isSuccess: boolean;
  message: string;
  result: {
    exist: boolean;
    gender: Gender;
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
  const { openModal } = useModal();
  const { refetch } = useRoomList(REQUEST.ROOM);
  const { refetch: fetchUserInfo } = useFetchUserInfo();
  const setErrorMessage = useSetAtom(errorMessageAtom);

  return useMutation<unknown, unknown, FormData>({
    mutationFn: data => submitRoomCreation(data),
    onSuccess: () => {
      refetch();
      fetchUserInfo();
      pop();
    },
    onError: e => {
      const error = e as Error;
      setErrorMessage(error.message);
      openModal(MODAL.ERROR);
    },
  });
};

export const useSubmitFriendPhone = () => {
  return useMutation<FriendPhoneResponse, unknown, string>({
    mutationFn: submitFriendPhone,
  });
};
