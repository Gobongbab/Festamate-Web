import React from 'react';
import { User } from '../types';
import {
  useFetchUserInfo,
  useSubmitUserBlock,
  useSubmitUserUnBlock,
} from '../api';

export default function UserDashBoard({
  id,
  name,
  nickname,
  studentId,
  loginId,
  phoneNumber,
  gender,
  department,
  profileImage,
  status,
}: User) {
  const blocked = status === 'BLOCKED';
  const { name: imageName, url } = profileImage;
  const { refetch } = useFetchUserInfo(id.toString());
  const { mutate: userBlock, isPending: blockPending } = useSubmitUserBlock();
  const { mutate: userUnBlock, isPending: unBlockPending } =
    useSubmitUserUnBlock();

  const handleBlockClick = () => {
    if (blocked) userUnBlock(id.toString(), { onSuccess: () => refetch() });
    else userBlock(id.toString(), { onSuccess: () => refetch() });
  };

  return (
    <div className='border-border rounded-10 min-w-100 relative flex w-fit flex-col gap-3 border-[1px] p-6'>
      <button
        name='blockUser'
        className='border-important/50 text-important hover:bg-important/20 bg-important/10 absolute right-6 top-6 w-fit cursor-pointer rounded-full border-[1px] px-3 py-1.5 transition duration-150'
        disabled={blockPending || unBlockPending}
        onClick={handleBlockClick}
      >
        {blocked ? '사용자 제재 해제' : '사용자 제재하기'}
      </button>
      <img src={url} alt={imageName} className='rounded-10 size-24' />
      <div className='flex gap-3'>
        <UserProperty label='이름' value={name} />
        <UserProperty
          label='성별'
          value={gender === 'MALE' ? '남성' : '여성'}
        />
      </div>
      <div className='flex gap-3'>
        <UserProperty label='학번' value={studentId} />
        <UserProperty label='학과' value={department} />
      </div>
      <div className='flex gap-3'>
        <UserProperty label='닉네임' value={nickname} />
        <UserProperty label='아이디' value={loginId} />
      </div>
      <UserProperty label='전화번호' value={phoneNumber} />
    </div>
  );
}

const UserProperty = ({ label, value }: { label: string; value: string }) => (
  <div className='flex items-center gap-2 text-lg'>
    <span className='border-border text-md w-fit rounded-full border-[1px] px-2 py-1'>
      {label}
    </span>
    <span>{value}</span>
  </div>
);
