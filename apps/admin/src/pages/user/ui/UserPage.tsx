import React from 'react';

import { UserSearchBoard } from '@/features/user/ui';
import { PageHeader } from '@/shared/ui';

export default function UserPage() {
  return (
    <div className='flex flex-col gap-6'>
      <PageHeader
        title='회원 조회하기'
        description='상세 정보를 확인하고자 하는 회원의 ID로 회원을 조회해요.'
      />
      <UserSearchBoard />
    </div>
  );
}
