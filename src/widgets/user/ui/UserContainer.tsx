import React from 'react';

import { FormItem, GroupCarousel } from '@/shared/ui';
import { PATH } from '@/shared/constants';

export default function UserContainer() {
  return (
    <>
      <Profile />
      <GroupCarousel label='내가 만든 모임방' to={PATH.LIST} />
      <div className='bg-sub mt-normal-spacing h-[1px] w-full flex-shrink-0' />
      <FormItem title='계정' childrenWrapper={false}>
        <button className='flex w-full justify-start focus:outline-none'>
          비밀번호 변경하기
        </button>
      </FormItem>
      <div className='bg-sub h-[1px] w-full flex-shrink-0' />
      <FormItem title='커뮤니티' childrenWrapper={false}>
        <button className='flex w-full justify-start focus:outline-none'>
          제재 내역
        </button>
      </FormItem>
      <div className='bg-sub h-[1px] w-full flex-shrink-0' />
      <FormItem title='앱 설정' childrenWrapper={false}>
        <button className='flex w-full justify-start focus:outline-none'>
          알림 설정
        </button>
      </FormItem>
      <div className='bg-sub h-[1px] w-full flex-shrink-0' />
      <FormItem title='기타' childrenWrapper={false}>
        <button className='flex w-full justify-start focus:outline-none'>
          이용 약관
        </button>
        <button className='mb-dock-height flex w-full justify-start focus:outline-none'>
          로그아웃
        </button>
      </FormItem>
    </>
  );
}

const Profile = () => (
  <div className='flex flex-col gap-y-3'>
    <span className='title'>내 정보</span>
    <div className='border-border rounded-10 hover:border-primary flex w-full cursor-pointer flex-col items-center justify-center gap-4 border-[1px] py-8 transition duration-200'>
      <div
        className='size-14 rounded-[50%] bg-cover bg-center'
        style={{
          backgroundImage:
            'url(https://i.pinimg.com/736x/04/15/e3/0415e3a6c56fc6e8f1e0ac1bed4b6aaf.jpg)',
        }}
      />
      <span className='font-medium'>김이박한정최황옥박</span>
      <div className='flex flex-col text-center'>
        <span>경기대학교</span>
        <span>23학번 재학생</span>
      </div>
    </div>
  </div>
);
