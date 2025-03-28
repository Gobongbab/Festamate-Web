import React from 'react';
import { RiUser3Fill } from 'react-icons/ri';

export default function ListItem() {
  return (
    <div className='border-border rounded-10 grid h-28 w-full grid-cols-[1fr_4fr] gap-3 py-3'>
      <div className='rounded-5 h-full bg-red-500/10'></div>
      <div className='flex h-full flex-col justify-between overflow-hidden'>
        <div>
          <p className='text-lg font-semibold'>컴공 부스 존맛존 같이 가영</p>
          <p className='w-full overflow-hidden text-nowrap text-ellipsis'>
            컴공 봄부스에서 닭강정한대요@ 컴공 봄부스에서 닭강정한대요@ 컴공
            봄부스에서 닭강정한대요@ 컴공 봄부스에서 닭강정한대요@ 컴공
            봄부스에서 닭강정한대요@
          </p>
        </div>
        <div className='text-light flex items-center gap-x-2 text-sm'>
          <p>3월 21일 18:00</p>·
          <p className='flex items-center gap-x-1'>
            <RiUser3Fill size={12} /> 2/6
          </p>
        </div>
      </div>
    </div>
  );
}
