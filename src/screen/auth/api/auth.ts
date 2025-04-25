import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { post, REQUEST, useFetchUserInfo } from '@/shared/api';
import { KakaoAccessTokenAtom, userTokenAtom } from '@/shared/atom';
import { RAW_PATH } from '@/shared/constants';
import { useEffect } from 'react';

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
  const setKakaoToken = useSetAtom(KakaoAccessTokenAtom);
  const { mutate } = useKakaoLogin();

  return useMutation<KakaoTokenResponse, unknown, { code: string }>({
    mutationFn: ({ code }) => submitKakaoToken(code),
    onSuccess: data => {
      const kakaoAccessToken = data.result.kakaoAccessToken;
      setKakaoToken({ kakaoAccessToken });
      if (data.result.member) mutate({ kakaoAccessToken });
      else
        window.location.replace(
          `${import.meta.env.VITE_PRODUCTION_URL + RAW_PATH.SIGNUP}`,
        );
    },
  });
};

export const useKakaoLogin = () => {
  const setUserAtom = useSetAtom(userTokenAtom);
  const { refetch: fetchUserInfo, isFetched } = useFetchUserInfo();

  useEffect(() => {
    if (isFetched)
      window.location.replace(`${import.meta.env.VITE_PRODUCTION_URL}`);
  }, [isFetched]);

  return useMutation<KakaoLoginResponse, unknown, KakaoLoginRequest>({
    mutationFn: ({ kakaoAccessToken }) => submitKakaoLogin(kakaoAccessToken),
    onSuccess: data => {
      setUserAtom(data.result);
      fetchUserInfo();
    },
    onError: () =>
      window.location.replace(`${import.meta.env.VITE_PRODUCTION_URL}`),
  });
};
