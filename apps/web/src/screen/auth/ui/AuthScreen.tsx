import React, { useEffect } from 'react';

import { useKakaoToken } from '@/screen/auth/api';
import { Loader } from '@/assets/images';
import { Button } from '@/shared/ui';
import { useAtomValue } from 'jotai';
import { errorMessageAtom } from '@/shared/atom';

export default function AuthScreen() {
  const params = new URLSearchParams(location.search);
  const errorMessage = useAtomValue(errorMessageAtom);
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
        <div className='flex w-full flex-col items-center justify-center gap-2 text-lg'>
          <span>로그인에 실패했어요.</span>
          <span>{errorMessage}</span>
          <Button
            size='sm'
            className='focus:outline-none'
            onClick={() =>
              window.location.replace(`${import.meta.env.VITE_PRODUCTION_URL}`)
            }
            label='홈으로 돌아가기'
          />
        </div>
      )}
    </div>
  );
}
