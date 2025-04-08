import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { KakaoAccessTokenAtom } from '@/shared/atom';
import { useKakaoToken } from '@/screen/auth/api';
import { useSetAtom } from 'jotai';

export default function AuthScreen() {
  const navigate = useNavigate();
  const setKakaoAccessToken = useSetAtom(KakaoAccessTokenAtom);
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const { mutate, isPending, isError, data, isSuccess } = useKakaoToken();

  useEffect(() => {
    if (code) {
      mutate(code);
    }
  }, [code, mutate]);

  useEffect(() => {
    if (isSuccess && data) {
      setKakaoAccessToken({ access_token: data.access_token });
      navigate('/');
    }
  }, [isSuccess, data, navigate, setKakaoAccessToken]);

  return (
    <div className='container-mobile grid h-screen place-items-center'>
      {isPending && <span className='text-lg'>로그인 중...</span>}
      {isError && (
        <div className='flex flex-col text-lg'>
          로그인에 실패했어요.
          <button className='focus:outline-none' onClick={() => navigate('/')}>
            홈으로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
}
