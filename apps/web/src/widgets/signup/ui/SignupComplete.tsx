import React from 'react';

import { SignupSuccessBg } from '@/assets/images';
import { Button } from '@/shared/ui';
import { RAW_PATH } from '@/shared/constants';
import { getPath } from '@festamate/utils';

export default function SignupComplete() {
  const handleHomeClick = () =>
    window.location.replace(
      `${getPath(import.meta.env.VITE_PRODUCTION_URL, RAW_PATH.HOME)}`,
    );
  return (
    <div
      className='grid h-screen w-full place-items-center bg-cover bg-center'
      style={{ backgroundImage: `url(${SignupSuccessBg})` }}
    >
      <div className='flex w-[80%] flex-col items-start gap-2'>
        <p className='text-xl font-semibold text-white'>축하해요!</p>
        <p className='text-xl font-semibold text-white'>가입이 완료되었어요!</p>
        <div className='mt-1 flex gap-x-2'>
          <Button
            name='go-home'
            size='sm'
            onClick={handleHomeClick}
            label='홈으로 가기'
          />
        </div>
      </div>
    </div>
  );
}
