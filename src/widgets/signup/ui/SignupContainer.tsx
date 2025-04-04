import React, { useState } from 'react';

import { cn } from '@/shared/utils';
import { SIGNUP_PROCESS } from '@/widgets/signup/model';
import { SignupSuccessBg } from '@/assets/images';
import { useFlow } from '@/app/stackflow';

export default function SignupContainer() {
  const [process, setProcess] = useState<number>(0);
  const { pop } = useFlow();
  const { title, element, width } = SIGNUP_PROCESS[process];

  const handleClick = () => {
    if (process < 4) setProcess(prev => prev + 1);
    else alert('end');
  };
  const handleHomeClick = () => pop();

  return (
    <>
      {process < 4 && (
        <>
          <div className='relative h-1 w-full'>
            <div
              className={cn(
                'absolute left-0 h-full bg-black transition-transform duration-150',
                width,
              )}
            />
          </div>
          <div className='flex size-full flex-col gap-y-6 p-12'>
            <p className='text-xl font-bold'>{title}</p>
            {element}
            <button
              name='next-step'
              onClick={handleClick}
              className='bg-fill border-border rounded-5 w-fit cursor-pointer border-[1px] p-2 px-4'
            >
              다음
            </button>
          </div>
        </>
      )}
      {process === 4 && (
        <div
          className='grid size-full place-items-center bg-cover bg-center'
          style={{ backgroundImage: `url(${SignupSuccessBg})` }}
        >
          <div className='flex w-[80%] flex-col items-start gap-2'>
            {title.split('\n').map(t => (
              <p key={t} className='text-xl font-semibold text-white'>
                {t}
              </p>
            ))}
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
      )}
    </>
  );
}
