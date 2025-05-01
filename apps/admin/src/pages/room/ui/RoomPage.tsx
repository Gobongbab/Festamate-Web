import React from 'react';

import { PageHeader } from '@/shared/ui';
import { RoomTable } from '@/features/room/ui';

export default function RoomPage() {
  return (
    <div className='flex flex-col gap-6'>
      <PageHeader
        title='모임방 조회하기'
        description='모임방을 조회하고 삭제합니다.'
      />
      <RoomTable />
    </div>
  );
}
