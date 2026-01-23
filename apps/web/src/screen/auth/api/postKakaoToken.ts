import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { post, REQUEST } from '@/shared/api';
import { errorMessageAtom, KakaoAccessTokenAtom } from '@/shared/atom';
import { RAW_PATH } from '@/shared/constants';

import { usePostKakaoLogin } from './postKakaoLogin';

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

const postKakaoToken = async (code: string) => {
  const response = await post<KakaoTokenRequest, KakaoTokenResponse>({
    request: REQUEST.KAKAO,
    data: { code: code },
  });
  return response.data;
};

export const usePostKakaoToken = () => {
  const setKakaoToken = useSetAtom(KakaoAccessTokenAtom);
  const setErrorMessageAtom = useSetAtom(errorMessageAtom);
  const { mutate } = usePostKakaoLogin();

  return useMutation<KakaoTokenResponse, Error, { code: string }>({
    mutationFn: ({ code }) => postKakaoToken(code),
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
