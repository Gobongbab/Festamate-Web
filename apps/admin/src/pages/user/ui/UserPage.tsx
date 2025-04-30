import React from 'react';

import { UserSearchBoard } from '@/features/user/ui';

export default function UserPage() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-1'>
        <p className='text-xl font-semibold'>회원 조회하기</p>
        <p className='text-lg'>
          상세 정보를 확인하고자 하는 회원의 ID로 회원을 조회해요.
        </p>
      </div>
      <UserSearchBoard />
    </div>
  );
}
