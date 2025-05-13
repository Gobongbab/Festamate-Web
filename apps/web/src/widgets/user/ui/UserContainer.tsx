import React from 'react';

import { FormItem, GroupCarousel } from '@/shared/ui';
import { MODAL } from '@/shared/constants';
import { useModal } from '@/shared/hook';
import { REQUEST } from '@/shared/api';

import { logout } from '@/widgets/user/utils';
import { UserProfile } from '@/widgets/user/ui';

export default function UserContainer() {
  const { openModal } = useModal();

  return (
    <>
      <UserProfile />
      <GroupCarousel label='참여한 모임' request={REQUEST.ROOM_PARTICIPATED} />
      <FormItem title='티켓'>
        <button
          name='registerTicket'
          className='flex w-full cursor-pointer justify-start focus:outline-none'
          onClick={() => openModal(MODAL.REGISTER_TICKET)}
        >
          티켓 등록하기
        </button>
      </FormItem>
      <div className='bg-sub h-[1px] w-full flex-shrink-0' />
      <FormItem title='커뮤니티'>
        <button className='flex w-full cursor-pointer justify-start focus:outline-none'>
          제재 내역
        </button>
      </FormItem>
      <div className='bg-sub h-[1px] w-full flex-shrink-0' />
      <FormItem title='앱 설정'>
        <button
          name='alertSetting'
          className='flex w-full cursor-pointer justify-start focus:outline-none'
          onClick={() => openModal(MODAL.ALERT_SETTING)}
        >
          알림 설정
        </button>
      </FormItem>
      <div className='bg-sub h-[1px] w-full flex-shrink-0' />
      <FormItem title='기타'>
        <button
          name='termOfService'
          className='flex w-full cursor-pointer justify-start focus:outline-none'
          onClick={() => openModal(MODAL.TERM_OF_SERVICE)}
        >
          이용 약관
        </button>
        <button
          name='logout'
          className='mb-dock-height text-important flex w-full cursor-pointer justify-start focus:outline-none'
          onClick={() => logout()}
        >
          로그아웃
        </button>
      </FormItem>
    </>
  );
}
