import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { useFlow } from '@/app/stackflow';

import { REQUEST, useFetchUserInfo, userPost } from '@/shared/api';
import { useGetRoomList } from '@/screen/home/api';
import { errorMessageAtom } from '@/shared/atom';
import { MODAL } from '@/shared/constants';
import { useModal } from '@/shared/hook';

const postRoom = async (data: FormData) => {
  await userPost<FormData>({
    request: REQUEST.ROOM,
    data: data,
  });
};

export const usePostRoom = () => {
  const { pop } = useFlow();
  const { openModal } = useModal();
  const { refetch } = useGetRoomList(REQUEST.ROOM);
  const { refetch: fetchUserInfo } = useFetchUserInfo();
  const setErrorMessage = useSetAtom(errorMessageAtom);

  return useMutation<unknown, unknown, FormData>({
    mutationFn: data => postRoom(data),
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
