import React from 'react';

import { FaSave } from 'react-icons/fa';

import { Input } from '@/shared/ui';

interface ProfileFormProps {
  profileImage: string;
  newNickname: string;
  setNewNickname: (value: string) => void;
  onSave: () => void;
  slicedStudentId: string;
}

export default function UserProfileForm({
  profileImage,
  newNickname,
  setNewNickname,
  onSave,
  slicedStudentId,
}: ProfileFormProps) {
  return (
    <>
      <button
        name='updateUserInfo'
        className='hover:text-dark text-light absolute top-6 right-6 cursor-pointer'
        onClick={onSave}
      >
        <FaSave />
      </button>
      <div
        className='size-14 rounded-[50%] bg-cover bg-center'
        style={{
          backgroundImage: `url(${profileImage})`,
        }}
      />
      <Input
        value={newNickname}
        onChange={e => setNewNickname(e.target.value)}
        className='font-medium'
      />
      <div className='flex flex-col text-center'>
        <span>경기대학교</span>
        <span>{slicedStudentId}학번 재학생</span>
      </div>
    </>
  );
}
