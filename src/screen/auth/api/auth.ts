import { post, REQUEST } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

interface PostKakaoRequest {
  code: string;
}

interface KakaoTokenResponse {
  access_token: string;
  refresh_token: string;
}

const postKakaoToken = async (code: string): Promise<KakaoTokenResponse> => {
  const response = await post<PostKakaoRequest>(REQUEST.LOGIN, { code: code });
  return response.data.result;
};

export const useKakaoToken = () => {
  return useMutation({
    mutationFn: postKakaoToken,
    onSuccess: (data: KakaoTokenResponse) => data,
  });
};
