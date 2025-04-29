import { useMutation } from '@tanstack/react-query';

import { REQUEST, useFetchUserInfo, userPost } from '@/shared/api';
import { useModal } from '@/shared/hook';
import { MODAL } from '@/shared/constants';

import { useUserRoomDetail } from '@/widgets/room/api';

interface SubmitRoomJoinRequest {
  friendPhoneNumbers: string[];
}

const submitRoomJoin = async (
  roomId: number,
  friendPhoneNumbers?: string[],
) => {
  await userPost<SubmitRoomJoinRequest>({
    request: REQUEST.ROOM_JOIN.split('{roomId}').join(`${roomId}`).toString(),
    data: { friendPhoneNumbers: friendPhoneNumbers ?? [] },
  });
};

export const useSubmitRoomJoin = (roomId: number) => {
  const { refetch } = useUserRoomDetail(roomId);
  const { refetch: fetchUserInfo } = useFetchUserInfo();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: submitRoomJoin,
    onSuccess: () => {
      refetch();
      fetchUserInfo();
      closeModal(MODAL.JOIN);
    },
  });
};
