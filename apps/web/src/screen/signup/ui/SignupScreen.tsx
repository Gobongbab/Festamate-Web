import React from 'react';

import { SignupContainer } from '@/widgets/signup/ui';
import { RAW_PATH } from '@/shared/constants';
import { getPath } from '@festamate/utils';

export default function SignupScreen() {
  return (
    <div className='size-screen flex flex-col'>
      <SignupHeader />
      <div className='scrollbar-hide container-mobile flex size-full flex-col overflow-y-scroll'>
        <SignupContainer />
      </div>
    </div>
  );
}

const SignupHeader = () => {
  return (
    <div className='container-width border-app-bar-border relative m-auto grid h-[64px] w-full place-items-center border-b-[0.5px]'>
      <button
        className='absolute left-6 h-full w-12 cursor-pointer focus:outline-none'
        onClick={() =>
          window.location.replace(
            `${getPath(import.meta.env.VITE_PRODUCTION_URL, RAW_PATH.HOME)}`,
          )
        }
      >
        홈으로
      </button>
      <span className='font-bold'>회원가입</span>
    </div>
  );
};
