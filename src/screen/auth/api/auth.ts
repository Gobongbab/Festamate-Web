import { post, REQUEST } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

interface KakaoTokenRequest {
  code: string;
}

interface KakaoTokenResponse {
  isSuccess: boolean;
  message: string;
  result: {
    kakaoAccessToken: string;
    member: boolean;
  };
}

interface KakaoLoginRequest {
  kakaoAccessToken: string;
}

const submitKakaoToken = async (code: string) => {
  const response = await post<KakaoTokenRequest, KakaoTokenResponse>({
    request: REQUEST.KAKAO,
    data: { code: code },
  });
  return response.data;
};

const submitKakaoLogin = async (kakaoAccessToken: string) => {
  const response = await post<KakaoLoginRequest>({
    request: REQUEST.LOGIN,
    data: { kakaoAccessToken: kakaoAccessToken },
  });
  console.log(response);
};

export const useKakaoToken = () => {
  return useMutation<KakaoTokenResponse, unknown, { code: string }>({
    mutationFn: ({ code }) => submitKakaoToken(code),
    onSuccess: data => data,
  });
};

export const useKakaoLogin = () => {
  return useMutation<unknown, unknown, KakaoLoginRequest>({
    mutationFn: ({ kakaoAccessToken }) => submitKakaoLogin(kakaoAccessToken),
    onSuccess: data => data,
  });
};
