import React from 'react';

import { RiUser3Fill } from 'react-icons/ri';

export default function RoomHeader() {
  return (
    <div className='rounded-10 grid h-28 w-full cursor-pointer grid-cols-[1fr_4fr] gap-3 py-3'>
      <div className='rounded-5 h-full bg-red-500/10'></div>
      <div className='flex h-full flex-col justify-between overflow-hidden'>
        <div className='flex flex-col items-start'>
          <p className='text-lg font-semibold'>컴공 부스 존맛존 같이 가영</p>
          <div className='flex justify-between gap-2 text-lg font-semibold'>
            <span className='text-point w-fit'>2:2 모임방</span>
            <span className='w-fit'>3월 21일 18:00</span>
          </div>
        </div>
        <div className='text-light flex items-center gap-x-2 text-sm'>
          <p className='flex items-center gap-x-1'>
            모임장<span>·</span>
            <RiUser3Fill size={12} />
            유노윤호
          </p>
        </div>
      </div>
    </div>
  );
}
