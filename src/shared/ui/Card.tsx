import React from 'react';

import { RiUser3Fill } from 'react-icons/ri';
import { IoMdFemale, IoMdMale } from 'react-icons/io';

import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';
import { RoomListItem } from '@/shared/types';
import { cn, getDate } from '@/shared/utils';
import { IoLocationSharp } from 'react-icons/io5';

export default function Card(props: RoomListItem) {
  const { push } = useFlow();
  const {
    title,
    thumbnail,
    maxParticipants,
    currentParticipants,
    meetingDateTime,
    preferredGender,
    place,
  } = props;

  const male = preferredGender === 'MALE';

  const handleClick = () => {
    push(PATH.ROOM, { ...props });
  };

  return (
    <button
      name='room-card'
      className='card rounded-10 h-card-height relative w-44 flex-shrink-0 bg-cover bg-center shadow-sm'
      style={{
        backgroundImage: `url(${thumbnail.url || ''})`,
      }}
      onClick={handleClick}
    >
      <div className='rounded-10 absolute inset-0 z-0 bg-black/40 bg-gradient-to-b from-transparent from-0% via-transparent via-50% to-black/60 to-100%' />
      <div className='absolute top-0 z-10 flex w-full flex-col items-start gap-1.5 p-4 text-sm text-white'>
        <div className='flex items-center gap-x-1 rounded-full border-[0.5px] border-white bg-white/30 px-2 py-1'>
          <RiUser3Fill size={12} /> {currentParticipants}명 / {maxParticipants}
          명
        </div>
        <div
          className={cn(
            'flex items-center gap-x-1 rounded-full border-[0.5px] px-2 py-1',
            male ? 'border-male bg-male/30' : 'border-female bg-female/30',
          )}
        >
          {male ? (
            <>
              <IoMdMale size={12} /> 남성
            </>
          ) : (
            <>
              <IoMdFemale size={12} /> 여성
            </>
          )}
        </div>
      </div>
      <div className='card-body z-10 justify-end p-4 text-white'>
        <div className='flex flex-col items-start gap-y-1 text-start'>
          <p className='text w-[80%] text-lg leading-tight font-semibold text-wrap'>
            {title}
          </p>
          <div className='text-sub flex flex-col overflow-hidden text-sm'>
            <span>{getDate(meetingDateTime, 'ddd요일 A h시 m분')}</span>
            <p className='flex items-center justify-start gap-x-1 overflow-hidden'>
              <IoLocationSharp size={12} />
              <span className='w-32 overflow-hidden text-start text-nowrap text-ellipsis'>
                {place}
              </span>
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
