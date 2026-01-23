import { useMutation } from '@tanstack/react-query';

import { REQUEST, useFetchUserInfo, userPost } from '@/shared/api';
import { useModal } from '@/shared/hook';
import { MODAL } from '@/shared/constants';

import { useGetUserRoomDetail } from '@/screen/room/api';

interface SubmitRoomJoinRequest {
  friendPhoneNumbers: string[];
}

const postRoomJoin = async ({
  roomId,
  friendPhoneNumbers,
}: {
  roomId: number;
  friendPhoneNumbers?: string[];
}) => {
  console.log({ friendPhoneNumbers: friendPhoneNumbers ?? [] });
  await userPost<SubmitRoomJoinRequest>({
    request: REQUEST.ROOM_JOIN.split('{roomId}').join(`${roomId}`).toString(),
    data: { friendPhoneNumbers: friendPhoneNumbers ?? [] },
  });
};

export const usePostRoomJoin = (roomId: number) => {
  const { refetch } = useGetUserRoomDetail(roomId);
  const { refetch: fetchUserInfo } = useFetchUserInfo();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: postRoomJoin,
    onSuccess: () => {
      refetch();
      fetchUserInfo();
      closeModal(MODAL.JOIN);
      closeModal(MODAL.JOIN_WITH_FRIEND);
    },
  });
};
