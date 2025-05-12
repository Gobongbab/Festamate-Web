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
        <a
          className='text-3xl text-red-500'
          href='https://festamate-web.vercel.app/'
        >
          테스트1
        </a>
        <button
          className='text-3xl text-red-500'
          onClick={() =>
            window.open('https://festamate-web.vercel.app/', '_blank')
          }
        >
          테스트2(아마 이게 될거임)
        </button>
      </div>
    </div>
  );
}
