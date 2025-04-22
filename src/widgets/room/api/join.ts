import { useMutation } from '@tanstack/react-query';

import { REQUEST } from '@/shared/api';
import { userPost } from '@/shared/api/user';
import { useModal } from '@/shared/hook';
import { MODAL } from '@/shared/constants';

import { useRoomDetail } from '@/widgets/room/api';

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
  const { refetch } = useRoomDetail(roomId);
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: submitRoomJoin,
    onSuccess: () => {
      refetch();
      closeModal(MODAL.JOIN);
    },
  });
};
