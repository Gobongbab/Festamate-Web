import { useMutation } from '@tanstack/react-query';

import { REQUEST, useFetchUserInfo, userPost } from '@/shared/api';
import { useModal } from '@/shared/hook';
import { MODAL } from '@/shared/constants';
import type { Gender } from '@/shared/types';

import { useUserRoomDetail } from '@/widgets/room/api';

interface SubmitRoomJoinRequest {
  friendPhoneNumbers: string[];
}

interface FriendPhoneResponse {
  isSuccess: boolean;
  message: string;
  result: {
    exist: boolean;
    gender: Gender;
  };
}

const submitFriendPhone = async (data: string) => {
  const response = await userPost<{ phoneNumber: string }, FriendPhoneResponse>(
    {
      request: REQUEST.CERTIFY_USER,
      data: { phoneNumber: data },
    },
  );
  return response.data;
};

const submitRoomJoin = async ({
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
      closeModal(MODAL.JOIN_WITH_FRIEND);
    },
  });
};

export const useSubmitFriendPhone = () => {
  return useMutation<FriendPhoneResponse, unknown, string>({
    mutationFn: submitFriendPhone,
  });
};
