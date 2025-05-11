import React from 'react';

import { cn } from '@festamate/utils';

import { RoomParticipant } from '@/widgets/room/types';

import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { useBottomSheet } from '@/shared/hook';
import { BOTTOM_SHEET } from '@/shared/constants';
import { useSetAtom } from 'jotai';
import { selectedUserAtom } from '@/shared/atom';

export default function UserItem({
  id,
  nickname,
  studentId,
  gender,
  department,
  profileImageUrl,
}: RoomParticipant) {
  const male = gender === 'MALE';
  const { openBottomSheet } = useBottomSheet();
  const setSelectedUser = useSetAtom(selectedUserAtom);

  return (
    <div className='rounded-10 relative grid h-15 w-full cursor-pointer grid-cols-[auto_6fr] gap-3 py-1 focus:outline-none'>
      <button
        name='userMenu'
        className='outline:focus-none active:bg-border absolute right-0 rounded-sm'
        onClick={() => {
          setSelectedUser(id);
          openBottomSheet(BOTTOM_SHEET.USER_MENU);
        }}
      >
        <HiEllipsisVertical size={20} />
      </button>
      <div>
        <div
          className='size-13 rounded-[50%] bg-cover bg-center'
          style={{
            backgroundImage: `url(${profileImageUrl || 'https://i.pinimg.com/736x/04/15/e3/0415e3a6c56fc6e8f1e0ac1bed4b6aaf.jpg'})`,
          }}
        />
      </div>
      <div className='flex size-full flex-col gap-0.5'>
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
