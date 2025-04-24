import React from 'react';

import { FormItem, GroupCarousel } from '@/shared/ui';
import { PATH } from '@/shared/constants';
import { REQUEST } from '@/shared/api';

import { logout } from '@/widgets/user/utils';
import { UserProfile } from '@/widgets/user/ui';

export default function UserContainer() {
  return (
    <>
      <UserProfile />
      <GroupCarousel
        label='참여한 모임방'
        to={PATH.LIST}
        request={REQUEST.ROOM_PARTICIPATED}
      />
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
        <button
          name='logout'
          className='mb-dock-height text-important flex w-full justify-start focus:outline-none'
          onClick={() => logout()}
        >
          로그아웃
        </button>
      </FormItem>
    </>
  );
}
