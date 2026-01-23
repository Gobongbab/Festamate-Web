import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { post, REQUEST, useFetchUserInfo } from '@/shared/api';
import { errorMessageAtom, userTokenAtom } from '@/shared/atom';

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

const postKakaoLogin = async (kakaoAccessToken: string) => {
  const response = await post<KakaoLoginRequest, KakaoLoginResponse>({
    request: REQUEST.LOGIN,
    data: { kakaoAccessToken: kakaoAccessToken },
  });
  return response.data;
};

export const usePostKakaoLogin = () => {
  const setUserAtom = useSetAtom(userTokenAtom);
  const setErrorMessageAtom = useSetAtom(errorMessageAtom);
  const { refetch: fetchUserInfo, isFetched } = useFetchUserInfo();

  useEffect(() => {
    if (isFetched)
      window.location.replace(`${import.meta.env.VITE_PRODUCTION_URL}`);
  }, [isFetched]);

  return useMutation<KakaoLoginResponse, Error, KakaoLoginRequest>({
    mutationFn: ({ kakaoAccessToken }) => postKakaoLogin(kakaoAccessToken),
    onSuccess: data => {
      setUserAtom(data.result);
      fetchUserInfo();
    },
    onError: error => setErrorMessageAtom(error.message),
  });
};
