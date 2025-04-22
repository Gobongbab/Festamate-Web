import { useMutation } from '@tanstack/react-query';

import { REQUEST, userPost } from '@/shared/api';
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
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: submitRoomJoin,
    onSuccess: () => {
      refetch();
      closeModal(MODAL.JOIN);
    },
  });
};
