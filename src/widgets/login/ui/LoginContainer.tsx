import React from 'react';

import { KakaoIcon } from '@/assets/icons';
import { Button } from '@/shared/ui';

export default function LoginContainer() {
  const handleClick = async () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}`;
  };

  return (
    <div className='grid size-full place-items-center'>
      <div className='flex h-fit w-full flex-col items-center px-6'>
        <p>축제를 더 즐겁게,</p>
        <p className='logo agbalumo-regular mb-6'>Festamate!</p>
        <Button
          onClick={handleClick}
          className='text-dark h-fit py-3 font-medium'
          bgColor='bg-kakao'
          label={
            <div className='flex w-full items-center justify-center gap-x-4'>
              <img src={KakaoIcon} className='size-6' />
              <span>카카오톡 간편 로그인</span>
            </div>
          }
          shadow={false}
        />
      </div>
    </div>
  );
}
