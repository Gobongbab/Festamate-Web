import { AdminBongBab } from '@/assets/image';
import React from 'react';

export default function HomePage() {
  return (
    <div className='grid h-screen place-items-center text-lg'>
      <div className='flex w-fit flex-col items-center'>
        <img src={AdminBongBab} className='size-36' />
        <p>Festamate 관리자 모드에 오신 것을 환영합니다..</p>
        <p>왼쪽에서 원하는 항목을 선택해 조회하세요..</p>
      </div>
    </div>
  );
}
