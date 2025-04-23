import React from 'react';

import { RoomListItem } from '@/shared/types';
import { GENDER, ROOM_STATUS } from '@/shared/constants';
import { GoClockFill } from 'react-icons/go';
import { RiUser3Fill } from 'react-icons/ri';
import { IoLocationSharp } from 'react-icons/io5';
import { cn, getDate } from '@/shared/utils';

export default function RoomHeader(props: RoomListItem) {
  const {
    title,
    thumbnail,
    currentParticipants,
    maxParticipants,
    preferredGender,
    meetingDateTime,
    preferredStudentIdMin,
    preferredStudentIdMax,
    place,
    status,
  } = props;

  return (
    <>
      <div className='rounded-10 relative flex h-fit w-full flex-col justify-end p-6'>
        <div
          className='bg-fill rounded-10 absolute inset-0 -z-1 h-full w-full bg-cover bg-center'
          style={{ backgroundImage: `url(${thumbnail.url || ''})` }}
        />
        <div className='rounded-10 absolute inset-0 z-0 bg-black/50 bg-gradient-to-b from-transparent from-0% via-transparent via-50% to-black/60 to-100%' />
        <div className='z-10 flex flex-col gap-1'>
          <p className='items-start text-lg font-semibold text-white'>
            {title}
          </p>
          <p className='flex items-center gap-2 text-sm text-white'>
            <span
              className={cn(
                'rounded-full border-1 px-2 py-1',
                preferredGender === 'MALE'
                  ? 'border-male bg-male/20'
                  : 'border-female bg-female/20',
              )}
            >
              {GENDER[preferredGender]}
            </span>
            <span
              className={cn(
                'rounded-full border-1 bg-white/20 px-2 py-1',
                status === 'MATCHING' && 'border-yellow-500',
                status === 'MATCHED' && 'border-green-500',
                status === 'CLOSED' && 'border-border',
              )}
            >
              {ROOM_STATUS[status]}
            </span>
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-1.5 text-start'>
          <GoClockFill size={11} />
          <span className='w-full overflow-hidden text-start'>
            {getDate(meetingDateTime, 'M월 DD일 ddd요일 A h:mm')}
          </span>
        </div>
        <p className='flex items-center gap-x-1.5'>
          <RiUser3Fill size={12} /> {currentParticipants}명 / {maxParticipants}
          명
        </p>
        <p className='flex items-center gap-x-1.5'>
          <RiUser3Fill size={12} /> {preferredStudentIdMin}학번 ~{' '}
          {preferredStudentIdMax}학번
        </p>
        <div className='flex items-center gap-1.5 text-start'>
          <IoLocationSharp size={12} />
          {place}
        </div>
      </div>
    </>
  );
}
