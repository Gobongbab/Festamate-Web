import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { post, REQUEST, useFetchUserInfo } from '@/shared/api';
import {
  errorMessageAtom,
  KakaoAccessTokenAtom,
  userTokenAtom,
} from '@/shared/atom';
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
  const setErrorMessageAtom = useSetAtom(errorMessageAtom);
  const { mutate } = useKakaoLogin();

  return useMutation<KakaoTokenResponse, Error, { code: string }>({
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
    onError: error => setErrorMessageAtom(error.message),
  });
};

export const useKakaoLogin = () => {
  const setUserAtom = useSetAtom(userTokenAtom);
  const setErrorMessageAtom = useSetAtom(errorMessageAtom);
  const { refetch: fetchUserInfo, isFetched } = useFetchUserInfo();

  useEffect(() => {
    if (isFetched)
      window.location.replace(`${import.meta.env.VITE_PRODUCTION_URL}`);
  }, [isFetched]);

  return useMutation<KakaoLoginResponse, Error, KakaoLoginRequest>({
    mutationFn: ({ kakaoAccessToken }) => submitKakaoLogin(kakaoAccessToken),
    onSuccess: data => {
      setUserAtom(data.result);
      fetchUserInfo();
    },
    onError: error => setErrorMessageAtom(error.message),
  });
};
