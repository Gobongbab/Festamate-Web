import React, { ChangeEvent, useState } from 'react';

import { FaSave } from 'react-icons/fa';

import { Input } from '@/shared/ui';
import { useUpdateUserProfile } from '../api';
import { useFetchUserInfo } from '@/shared/api';

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
  const [image, setImage] = useState<string>(profileImage);
  const [file, setFile] = useState<File | undefined>();
  const { mutate } = useUpdateUserProfile();
  const { refetch } = useFetchUserInfo();

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage('');
      setFile(undefined);
    }
  };

  const handleProfileSave = () => {
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);
      mutate(formData);
      refetch();
      onSave();
    } else {
      onSave();
    }
  };

  return (
    <>
      <button
        name='updateUserInfo'
        className='hover:text-dark text-light absolute top-6 right-6 cursor-pointer'
        onClick={handleProfileSave}
      >
        <FaSave />
      </button>
      <label htmlFor='file'>
        <input
          id='file'
          type='file'
          className='hidden'
          accept='image/*'
          onChange={handleImageInputChange}
        />
        <div
          className='grid size-14 cursor-pointer place-items-center rounded-[50%] bg-cover bg-center'
          style={{ backgroundImage: `url(${image ?? ''})` }}
        >
          {image === profileImage && (
            <span className='grid size-14 place-items-center rounded-full bg-white/80'>
              변경
            </span>
          )}
        </div>
      </label>
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
