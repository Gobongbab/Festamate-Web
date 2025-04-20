import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { post, REQUEST } from '@/shared/api';
import { userAtom } from '@/shared/atom';
import { RAW_PATH } from '@/shared/constants';

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

interface KakaoLoginResponse {
  isSuccess: boolean;
  message: string;
  result: {
    accessToken: string;
    refreshToken: string;
  };
}

const submitKakaoToken = async (code: string) => {
  const response = await post<KakaoTokenRequest, KakaoTokenResponse>({
    request: REQUEST.KAKAO,
    data: { code: code },
  });
  return response.data;
};

const submitKakaoLogin = async (kakaoAccessToken: string) => {
  const response = await post<KakaoLoginRequest, KakaoLoginResponse>({
    request: REQUEST.LOGIN,
    data: { kakaoAccessToken: kakaoAccessToken },
  });
  return response.data;
};

export const useKakaoToken = () => {
  return useMutation<KakaoTokenResponse, unknown, { code: string }>({
    mutationFn: ({ code }) => submitKakaoToken(code),
    onSuccess: data => data,
  });
};

export const useKakaoLogin = () => {
  const setUserAtom = useSetAtom(userAtom);
  const navigate = useNavigate();

  return useMutation<KakaoLoginResponse, unknown, KakaoLoginRequest>({
    mutationFn: ({ kakaoAccessToken }) => submitKakaoLogin(kakaoAccessToken),
    onSuccess: data => {
      setUserAtom(data.result);
      navigate(RAW_PATH.HOME);
    },
  });
};
