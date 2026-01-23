import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { getPath } from '@festamate/utils';

import {
  REQUEST,
  useFetchUserInfo,
  useRoomList,
  userPatch,
  userPost,
} from '@/shared/api';
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

const submitRoomEdit = async ({
  data,
  roomId,
}: {
  data: FormData;
  roomId: number;
}) => {
  await userPatch<FormData>({
    request: getPath(REQUEST.ROOM, `${roomId}`),
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

export const useFormSubmit = (roomId: number) => {
  const { openModal } = useModal();
  const { refetch: fetchRoomList } = useRoomList(REQUEST.ROOM);
  const { refetch: fetchUserInfo } = useFetchUserInfo();
  const setErrorMessage = useSetAtom(errorMessageAtom);

  return useMutation<unknown, unknown, FormData>({
    mutationFn: data => submitRoomEdit({ data, roomId: roomId }),
    onSuccess: () => {
      fetchRoomList();
      fetchUserInfo();
      window.location.replace(`${import.meta.env.VITE_PRODUCTION_URL}`);
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
