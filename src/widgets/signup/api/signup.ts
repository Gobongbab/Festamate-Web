import { post, REQUEST } from '@/shared/api';
import { userAtom } from '@/shared/atom';
import { Gender } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

interface SubmitSignupRequest {
  name: string;
  studentId: string;
  phoneNumber: string;
  gender: Gender;
  major: string;
  kakaoAccessToken: string;
}

interface SubmitSignupResponse {
  isSuccess: boolean;
  message: string;
  result: {
    accessToken: string;
    refreshToken: string;
  };
}

const submitSignup = async (data: SubmitSignupRequest) => {
  const response = await post<SubmitSignupRequest, SubmitSignupResponse>({
    request: REQUEST.SIGNUP,
    data: data,
  });
  return response.data;
};

export const useSignup = () => {
  const setUserAtom = useSetAtom(userAtom);

  return useMutation<SubmitSignupResponse, unknown, SubmitSignupRequest>({
    mutationFn: data => submitSignup(data),
    onSuccess: data => setUserAtom(data.result),
  });
};
