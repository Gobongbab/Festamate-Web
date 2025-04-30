import React, { useState } from 'react';
import { Input } from '@/shared/ui';
import { useFetchUserInfo } from '../api';
import UserDashBoard from './UserDashBoard';

export default function UserSearchBoard() {
  const [fetched, setFetched] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const { refetch, data, isFetching, isError } = useFetchUserInfo(userId);
  const handleClick = () => {
    setFetched(true);
    refetch();
  };

  // const dummyUser: User = {
  //   id: 1,
  //   name: '홍길동',
  //   nickname: '길동이',
  //   studentId: '202312345',
  //   loginId: 'hong123',
  //   loginPassword: 'securepassword123',
  //   phoneNumber: '010-1234-5678',
  //   gender: 'MALE',
  //   department: '컴퓨터공학과',
  //   profileImage: {
  //     name: 'profile.jpg',
  //     url: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
  //   },
  // };

  return (
    <div className='rounded-10 border-border flex w-full flex-col gap-6 border-[1px] p-6'>
      <div className='flex flex-col gap-3'>
        <p className='text-xl font-medium'>회원 조회하기</p>
        <div className='flex items-end gap-3'>
          <div className='w-80'>
            <Input
              value={userId}
              onChange={e => setUserId(e.target.value)}
              labelClassName='text-md font-medium'
              placeholder='회원 ID를 입력해 주세요.'
            />
          </div>
          <button
            className='bg-sub border-border hover:bg-border h-[37px] cursor-pointer text-nowrap rounded-full border-[1px] px-4 transition duration-150'
            onClick={handleClick}
          >
            검색하기
          </button>
        </div>
      </div>

      {fetched && (
        <div className='flex w-full flex-col gap-3'>
          <p className='text-xl font-medium'>회원 조회 결과</p>
          {isFetching && <p className='text-light'>조회 중...</p>}
          {isError && (
            <p className='text-light'>
              회원 정보를 받아오지 못했어요. 아이디를 다시 한번 확인해 주세요.
            </p>
          )}
          {data && <UserDashBoard {...data} />}
        </div>
      )}
    </div>
  );
}
