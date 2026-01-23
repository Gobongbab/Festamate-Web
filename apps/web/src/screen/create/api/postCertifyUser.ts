import { useMutation } from '@tanstack/react-query';

import { REQUEST, userPost } from '@/shared/api';
import { Gender } from '@/shared/types';

interface FriendPhoneResponse {
  isSuccess: boolean;
  message: string;
  result: {
    exist: boolean;
    gender: Gender;
  };
}

const postCertifyUser = async (data: string) => {
  const response = await userPost<{ phoneNumber: string }, FriendPhoneResponse>(
    {
      request: REQUEST.CERTIFY_USER,
      data: { phoneNumber: data },
    },
  );
  return response.data;
};

export const usePostCertifyUser = () => {
  return useMutation<FriendPhoneResponse, unknown, string>({
    mutationFn: postCertifyUser,
  });
};
