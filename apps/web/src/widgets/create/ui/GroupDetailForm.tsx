import React from 'react';

import {
  UseFormSetValue,
  UseFormWatch,
  type UseFormRegister,
} from 'react-hook-form';

import { FormItem, Input, Radio } from '@/shared/ui';
import { Room } from '@/shared/types';
import { getDate } from '@festamate/utils';
import { DETAIL_OPTION, useRoomCreateContext } from '@/widgets/create/model';

interface GroupTitleFormProps {
  register: UseFormRegister<Room>;
  watch: UseFormWatch<Room>;
  setValue: UseFormSetValue<Room>;
}

export default function GroupDetailForm({
  register,
  watch,
  setValue,
}: GroupTitleFormProps) {
  const {
    preferredGender,
    maxParticipants,
    meetingDateTime,
    preferredStudentIdMin,
    preferredStudentIdMax,
  } = watch();
  const { maxParticipantsRender, setMaxParticipantsRender } =
    useRoomCreateContext();

  return (
    <>
      <FormItem
        title='희망 멤버 학번'
        description='모임에 들어올 구성원들의 학번을 지정해주세요.'
      >
        <div className='flex w-full items-center gap-2'>
          <Input
            className='w-14'
            type='number'
            id='preferredStudentIdMin'
            value={preferredStudentIdMin.slice(0, 2)}
            {...register('preferredStudentIdMin', { required: true })}
          />
          이상
          <Input
            className='w-14'
            type='number'
            id='preferredStudentIdMax'
            value={preferredStudentIdMax.slice(0, 2)}
            {...register('preferredStudentIdMax', { required: true })}
          />
          이하
        </div>
      </FormItem>
      <FormItem
        title='성별 선택'
        description='모임에 들어올 구성원들의 성별을 선택해주세요.'
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
        title='인원 선택'
        description='1:1은 2명, 2:2는 4명, 3:3은 6명을 선택해주세요.'
      >
        {DETAIL_OPTION.maxParticipants.map(({ id, value, label }) => (
          <Radio
            key={id}
            id={id}
            value={value}
            label={label}
            checked={Number(maxParticipants) === value}
            onChange={() => {
              setMaxParticipantsRender(value);
              setValue('maxParticipants', value);
            }}
          />
        ))}
      </FormItem>
      {maxParticipantsRender !== 2 && (
        <FormItem
          title='친구'
          description={
            <>
              <p>모임을 함께 생성하는 친구의 전화번호를 입력해주세요.</p>
              <p>친구도 Festamate!에 가입된 상태여야 해요!</p>
            </>
          }
          className='flex flex-col gap-2'
        >
          <FriendInput />
          {maxParticipantsRender === 6 && <FriendInput />}
        </FormItem>
      )}
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

const FriendInput = () => (
  <div className='flex w-fit gap-2'>
    <div className='w-50'>
      <Input
        id='co-founder'
        placeholder='전화번호'
        type='phone'
        // onChange={e => {
        //   const rawValue = e.target.value;
        //   const formattedValue = getFormattedPhone(rawValue);
        // }} 차후 해당 로직 연결 & 데이터 패칭 진행하면 됩니다.
      />
    </div>
    <button
      id='co-founder'
      type='button'
      className='bg-fill rounded-5 border-border hover:bg-sub cursor-pointer border-[1px] px-4 py-2'
    >
      친구 추가
    </button>
  </div>
);
