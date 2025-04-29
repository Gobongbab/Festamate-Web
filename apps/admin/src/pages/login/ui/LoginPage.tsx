import React from 'react';

import { LoginForm } from '@/features/login/ui';

export default function LoginPage() {
  return (
    <div className='grid h-screen place-items-center p-6'>
      <div className='rounded-10 box-shadow-login min-w-140 flex flex-col gap-8 px-8 py-6'>
        <p className='text-2xl font-semibold'>
          <span className='agbalumo-regular mr-1'>Festamate!</span> 관리자
          로그인
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
