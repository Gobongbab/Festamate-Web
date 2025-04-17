import React from 'react';

import { cn } from '@/shared/utils';

import { RoomParticipant } from '@/widgets/room/types';

export default function UserItem({
  nickname,
  studentId,
  gender,
  major,
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
      <div className='flex size-full flex-col gap-y-1'>
        <div className='flex w-fit items-center gap-x-2'>
          <span className='text-lg font-semibold'>{nickname}</span>
          <span
            className={cn(
              'rounded-5 grid w-fit place-items-center border-[0.5px] p-1 px-2 text-[10px]',
              male ? 'border-male bg-male/20' : 'border-female bg-female/20',
            )}
          >
            {male ? '남성' : '여성'}
          </span>
        </div>
        <div className='flex w-fit items-center gap-x-1'>
          <span>{major}</span>·<span>{studentId}학번 재학생</span>
        </div>
      </div>
    </div>
  );
}
