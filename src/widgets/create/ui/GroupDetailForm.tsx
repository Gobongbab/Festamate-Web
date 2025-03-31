import React from 'react';

import { UseFormWatch, type UseFormRegister } from 'react-hook-form';

import { FormItem, Input, Radio } from '@/shared/ui';
import { Room } from '../types';
import { DETAIL_OPTION } from '../model';
import { getDate } from '@/shared/utils';

interface GroupTitleFormProps {
  register: UseFormRegister<Room>;
  watch: UseFormWatch<Room>;
}

export default function GroupDetailForm({
  register,
  watch,
}: GroupTitleFormProps) {
  const { openChatLink, preferredGender, headCount, meetingDateTime } = watch();

  return (
    <>
      <FormItem
        title='인원 선택'
        description='1:1은 2명, 2:2는 4명, 3:3은 6명을 선택해주세요.'
      >
        {DETAIL_OPTION.headCount.map(({ id, value, label }) => (
          <Radio
            key={id}
            id={id}
            value={value}
            label={label}
            checked={headCount === value}
            {...register('headCount')}
          />
        ))}
      </FormItem>
      <FormItem
        title='성별 선택'
        description='모임방에 들어올 구성원들의 성별을 선택해주세요.'
      >
        {DETAIL_OPTION.preferredGender.map(({ id, value, label }) => (
          <Radio
            key={id}
            id={id}
            label={label}
            value={value}
            checked={preferredGender === value}
            {...register('preferredGender')}
          />
        ))}
      </FormItem>
      <FormItem
        title='연락 수단'
        description='구성원들에게 연락할 수 있는 링크를 알려주세요.'
      >
        <Input
          id='url'
          value={openChatLink}
          placeholder='오픈채팅 링크를 입력해주세요.'
          {...register('openChatLink', { required: true })}
        />
      </FormItem>
      <FormItem
        title='모임 날짜'
        className='mb-normal-spacing flex gap-x-2'
        description='모임 날짜를 입력해주세요'
      >
        <button
          type='button'
          name='meeting-date-time'
          className='border-border hover:border-point rounded-5 flex-1 cursor-pointer border-[1px] bg-white px-4 py-2 transition duration-150 focus:outline-none'
        >
          {getDate(meetingDateTime, 'YYYY년 MM월 DD일')}
        </button>
        <button
          type='button'
          name='meeting-date-time'
          className='border-border hover:border-point rounded-5 flex-1 cursor-pointer border-[1px] bg-white px-4 py-2 transition duration-150 focus:outline-none'
        >
          {getDate(meetingDateTime, 'HH시 MM분')}
        </button>
      </FormItem>
    </>
  );
}
