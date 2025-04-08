import React from 'react';

import { useFlow } from '@/app/stackflow';
import { SignupSuccessBg } from '@/assets/images';

export default function SignupComplete() {
  const { pop } = useFlow();
  const handleHomeClick = () => pop();

  return (
    <div
      className='grid size-full place-items-center bg-cover bg-center'
      style={{ backgroundImage: `url(${SignupSuccessBg})` }}
    >
      <div className='flex w-[80%] flex-col items-start gap-2'>
        <p className='text-xl font-semibold text-white'>축하해요!</p>
        <p className='text-xl font-semibold text-white'>가입이 완료되었어요!</p>

        <div className='mt-1 flex gap-x-2'>
          <button
            onClick={handleHomeClick}
            className='bg-fill border-border rounded-5 cursor-pointer border-[1px] p-2 px-6'
          >
            홈으로 가기
          </button>
          <button
            onClick={handleHomeClick}
            className='bg-fill border-border rounded-5 cursor-pointer border-[1px] p-2 px-6'
          >
            n초 후 홈으로 이동
          </button>
        </div>
      </div>
    </div>
  );
}
