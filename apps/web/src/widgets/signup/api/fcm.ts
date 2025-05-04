import { REQUEST, userPost } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

const submitFcmToken = async (token: string) => {
  await userPost({
    request: REQUEST.FCM_TOKEN,
    data: { fcmToken: token },
  });
};

export const useSubmitFcmToken = () => {
  return useMutation({
    mutationFn: submitFcmToken,
  });
};
