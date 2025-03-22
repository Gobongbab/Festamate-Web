import React, { useState } from 'react';

import { Input, Toggle } from '@/shared/ui';

export default function UserContainer() {
  const [activate, setActivate] = useState<boolean>(false);

  return (
    <>
      <div className='flex flex-col gap-y-3'>
        <span className='title'>내 정보</span>
        <div className='border-border rounded-10 hover:border-primary flex w-full cursor-pointer items-center gap-x-4 border-[1px] p-4 transition duration-200'>
          <div
            className='size-14 rounded-[50%] bg-cover bg-center'
            style={{
              backgroundImage:
                'url(https://i.pinimg.com/736x/04/15/e3/0415e3a6c56fc6e8f1e0ac1bed4b6aaf.jpg)',
            }}
          />
          <div className='flex flex-col'>
            <span className='text-md font-medium'>user234d52</span>
            <span>프로필 변경하기</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-y-3'>
        <span className='title'>내가 개설한 모임방</span>
        <div className='rounded-10 border-border h-20 w-full border-[1px]'></div>
      </div>
      <div className='flex flex-col gap-y-3'>
        <span className='title'>알림 설정</span>
        <Toggle
          id='notification'
          label='매칭 알림'
          labelLeft
          checked={activate}
          onChange={() => setActivate(prev => !prev)}
        />
        <Toggle
          id='notification'
          label='매칭 알림'
          labelLeft
          checked={activate}
          onChange={() => setActivate(prev => !prev)}
        />
      </div>
      <div className='flex flex-col gap-y-3'>
        <span className='title'>개인정보 변경</span>
        <Input label='아이디' />
        <Input label='현재 비밀번호' type='password' />
        <Input label='변경할 비밀번호' type='password' />
      </div>
      <button className='rounded-10 text-md hover:bg-primary-hover mb-6 h-16 w-full flex-shrink-0 cursor-pointer bg-[#775bf0] font-semibold text-white'>
        저장하기
      </button>
    </>
  );
}
