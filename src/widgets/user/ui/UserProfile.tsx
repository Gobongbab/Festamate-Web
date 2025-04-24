import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { BsPencilFill } from 'react-icons/bs';

import { userAtom } from '@/shared/atom';

import { UserProfileForm } from '@/widgets/user/ui';
import { useUpdateUserInfo } from '@/widgets/user/api';

export default function UserProfile() {
  const { nickname, studentId, profileImage } = useAtomValue(userAtom)!;

  const [update, setUpdate] = useState<boolean>(false);
  const [newNickname, setNewNickname] = useState<string>(nickname);
  const { mutate } = useUpdateUserInfo();
  const slicedStudentId = studentId.slice(2, 4);

  const handleSave = () => {
    mutate(
      { nickname: newNickname },
      {
        onSuccess: () => setUpdate(false),
      },
    );
  };

  return (
    <div className='flex flex-col gap-y-3'>
      <span className='title'>내 정보</span>
      <div className='border-border rounded-10 relative flex w-full cursor-pointer flex-col items-center justify-center gap-4 border-[1px] py-8'>
        {update ? (
          <UserProfileForm
            profileImage={profileImage.url}
            newNickname={newNickname}
            setNewNickname={setNewNickname}
            onSave={handleSave}
            slicedStudentId={slicedStudentId}
          />
        ) : (
          <>
            <button
              name='updateUserInfo'
              className='hover:text-dark text-light absolute top-6 right-6 cursor-pointer'
              onClick={() => setUpdate(true)}
            >
              <BsPencilFill />
            </button>
            <div
              className='size-14 rounded-[50%] bg-cover bg-center'
              style={{
                backgroundImage: `url(${profileImage.url})`,
              }}
            />
            <span className='font-medium'>{nickname}</span>
            <div className='flex flex-col text-center'>
              <span>경기대학교</span>
              <span>{slicedStudentId}학번 재학생</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
