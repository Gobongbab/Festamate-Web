import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';

import { useKakaoLogin, useKakaoToken } from '@/screen/auth/api';
import { Loader } from '@/assets/images';
import { KakaoAccessTokenAtom } from '@/shared/atom';
import { RAW_PATH } from '@/shared/constants';
import { getPath } from '@/shared/utils';

export default function AuthScreen() {
  const setKakaoToken = useSetAtom(KakaoAccessTokenAtom);

  const params = new URLSearchParams(location.search);
  const code = params.get('code');

  const { mutate, isPending, isError, data, isSuccess } = useKakaoToken();
  const login = useKakaoLogin().mutate;

  useEffect(() => {
    if (code) mutate({ code });
  }, [code, mutate]);

  useEffect(() => {
    if (isSuccess && data) {
      const kakaoAccessToken = data.result.kakaoAccessToken;
      setKakaoToken({ kakaoAccessToken });
      if (data.result.member) login({ kakaoAccessToken });
      else
        window.location.replace(
          `${getPath(import.meta.env.VITE_PRODUCTION_URL, RAW_PATH.SIGNUP)}`,
        );
    }
  }, [isSuccess, data, login, setKakaoToken]);

  return (
    <div className='container-mobile grid h-screen place-items-center'>
      {isPending && (
        <div className='flex flex-col'>
          <img src={Loader} className='size-26' alt='loading..' />
          <p className='text-center'>로그인 중..</p>
        </div>
      )}
      {isError && (
        <div className='flex flex-col text-lg'>
          로그인에 실패했어요.
          <button
            className='focus:outline-none'
            onClick={() => window.history.replaceState(null, '', RAW_PATH.HOME)}
          >
            홈으로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
}
