import React from 'react';

import { cn } from '@festamate/utils';

import { RoomParticipant } from '@/widgets/room/types';
import { IoMdFemale, IoMdMale } from 'react-icons/io';

export default function UserItem({
  nickname,
  studentId,
  gender,
  department,
}: RoomParticipant) {
  const male = gender === 'MALE';

  return (
    <div className='rounded-10 grid h-15 w-full cursor-pointer grid-cols-[auto_6fr] gap-3 py-1 focus:outline-none'>
      <div>
        <div
          className='size-13 rounded-[50%] bg-cover bg-center'
          style={{
            backgroundImage:
              'url(https://i.pinimg.com/736x/04/15/e3/0415e3a6c56fc6e8f1e0ac1bed4b6aaf.jpg)',
          }}
        />
      </div>
      <div className='flex size-full flex-col'>
        <div className='flex w-fit items-center gap-x-2'>
          <span
            className={cn(
              'rounded-5 grid w-fit place-items-center',
              male ? 'text-male' : 'text-female',
            )}
          >
            {male ? <IoMdMale size={16} /> : <IoMdFemale size={16} />}
          </span>
          <span className='text-lg font-semibold'>{nickname}</span>
        </div>
        <div className='flex w-fit items-center gap-x-1'>
          <span>{department}</span>·<span>{studentId}학번 재학생</span>
        </div>
      </div>
    </div>
  );
}
