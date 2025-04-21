import React, { useEffect } from 'react';

import { useKakaoToken } from '@/screen/auth/api';
import { Loader } from '@/assets/images';
import { RAW_PATH } from '@/shared/constants';

export default function AuthScreen() {
  const params = new URLSearchParams(location.search);
  const code = params.get('code');

  const { mutate, isPending, isError } = useKakaoToken();

  useEffect(() => {
    if (code) mutate({ code });
  }, [code, mutate]);

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
