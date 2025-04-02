import React from 'react';

import { RiUser3Fill } from 'react-icons/ri';
import { IoMdFemale } from 'react-icons/io';

import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';

export default function Card() {
  const { push } = useFlow();
  const handleClick = () => {
    push(PATH.ROOM, { title: '모임방 상세' });
  };

  return (
    <button
      name='room-card'
      className='card rounded-10 h-card-height relative w-44 flex-shrink-0 bg-cover bg-center shadow-sm'
      style={{
        backgroundImage:
          'url(https://i.pinimg.com/736x/81/09/5c/81095c402f3fda5bff8cb19692d96dd9.jpg)',
      }}
      onClick={handleClick}
    >
      <div className='rounded-10 absolute inset-0 z-0 bg-black/40 bg-gradient-to-b from-transparent from-0% via-transparent via-50% to-black/60 to-100%' />
      <div className='absolute top-0 z-10 flex w-fit items-center gap-x-2 p-4 text-sm text-white'>
        <div className='flex items-center gap-x-1 rounded-full border-[0.5px] border-white bg-white/30 px-2 py-1'>
          <RiUser3Fill size={12} /> 2/6
        </div>
        <div className='border-female bg-female/30 flex items-center gap-x-1 rounded-full border-[0.5px] px-2 py-1'>
          <IoMdFemale size={12} /> 여성
        </div>
      </div>

      <div className='card-body z-10 justify-end p-4 text-white'>
        <div className='flex flex-col items-start gap-y-1'>
          <p className='w-[80%] text-lg leading-tight font-semibold text-wrap'>
            컴공 부스 같이 가실 분 구해용
          </p>
          <p className='text-sub text-sm'>1월 27일 18:00</p>
        </div>
      </div>
    </button>
  );
}
