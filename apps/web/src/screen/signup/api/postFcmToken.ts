import { REQUEST, userPost } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

const postFcmToken = async (token: string) => {
  await userPost({
    request: REQUEST.FCM_TOKEN,
    data: { fcmToken: token },
  });
};

export const usePostFcmToken = () => {
  return useMutation({
    mutationFn: postFcmToken,
  });
};
