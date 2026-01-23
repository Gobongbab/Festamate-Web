import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { getPath } from '@festamate/utils';

import { REQUEST, useFetchUserInfo, userPatch } from '@/shared/api';
import { useRoomList } from '@/screen/home/api';
import { errorMessageAtom } from '@/shared/atom';
import { MODAL } from '@/shared/constants';
import { useModal } from '@/shared/hook';

const patchRoom = async ({
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

export const usePatchRoom = (roomId: number) => {
  const { openModal } = useModal();
  const { refetch: fetchRoomList } = useRoomList(REQUEST.ROOM);
  const { refetch: fetchUserInfo } = useFetchUserInfo();
  const setErrorMessage = useSetAtom(errorMessageAtom);

  return useMutation<unknown, unknown, FormData>({
    mutationFn: data => patchRoom({ data, roomId: roomId }),
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
