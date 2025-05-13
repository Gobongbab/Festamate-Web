import React, { useState } from 'react';
import { useAtomValue } from 'jotai';

import {
  UseFormSetValue,
  UseFormWatch,
  type UseFormRegister,
} from 'react-hook-form';

import { getDate, getFormattedPhone } from '@festamate/utils';

import { FormItem, Input, Radio } from '@/shared/ui';
import { userAtom } from '@/shared/atom';
import { Room } from '@/shared/types';
import { useBottomSheet } from '@/shared/hook';
import { BOTTOM_SHEET } from '@/shared/constants';

import { DETAIL_OPTION, useRoomCreateContext } from '@/widgets/create/model';
import { useSubmitFriendPhone } from '@/widgets/create/api';

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
    preferredStudentIdMin,
    preferredStudentIdMax,
    openChatUrl,
  } = watch();
  const {
    maxParticipantsRender,
    setMaxParticipantsRender,
    date,
    friendPhoneNumbers,
  } = useRoomCreateContext();
  const { openBottomSheet } = useBottomSheet();
  const isFormValid =
    maxParticipantsRender !== 2
      ? friendPhoneNumbers.length === maxParticipants / 2 - 1
      : true;

  return (
    <>
      <FormItem
        title='희망 멤버 학번'
        description='모임에 들어올 구성원들의 학번을 제한해요.'
      >
        <div className='flex w-full items-center gap-2'>
          <Input
            className='h-12 w-14 text-center'
            type='number'
            id='preferredStudentIdMin'
            value={preferredStudentIdMin.slice(0, 2)}
            {...register('preferredStudentIdMin', { required: true })}
          />
          학번 이상
          <Input
            className='h-12 w-14 text-center'
            type='number'
            id='preferredStudentIdMax'
            value={preferredStudentIdMax.slice(0, 2)}
            {...register('preferredStudentIdMax', { required: true })}
          />
          학번 이하
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
      {!isFormValid && maxParticipantsRender !== 2 && (
        <FormItem
          title='친구'
          description={
            <>
              <p>모임을 함께 생성하는 친구의 전화번호를 입력해주세요.</p>
              <p>친구도 Festamate!에 가입된 상태여야 해요!</p>
              <p>친구의 성별이 같아야 모임을 생성할 수 있어요.</p>
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
          className='border-border active:border-point rounded-5 h-12 flex-1 cursor-pointer border-[1px] bg-white px-4 py-2 transition duration-150 focus:outline-none'
          onClick={() => openBottomSheet(BOTTOM_SHEET.DATE_PICKER)}
        >
          {getDate(date, 'YYYY년 M월 D일')}
        </button>
        <button
          type='button'
          name='meeting-date-time'
          className='border-border active:border-point rounded-5 h-12 flex-1 cursor-pointer border-[1px] bg-white px-4 py-2 transition duration-150 focus:outline-none'
          onClick={() => openBottomSheet(BOTTOM_SHEET.TIME_PICKER)}
        >
          {getDate(date, 'A h시 m분')}
        </button>
      </FormItem>
      <FormItem
        title='모임 오픈채팅방 링크'
        description='모임 구성원들과 대화를 나눌 오픈채팅방 링크를 입력해주세요'
      >
        <Input
          id='openChatUrl'
          placeholder='https://open.kakao.com/o/sgcUtX3g'
          value={openChatUrl}
          {...register('openChatUrl', { required: true })}
          className='h-12'
        />
      </FormItem>
    </>
  );
}

const FriendInput = () => {
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState<string>('');
  const { mutate } = useSubmitFriendPhone();
  const { phoneNumber, gender } = useAtomValue(userAtom)!;
  const { setFriendPhoneNumbers, friendPhoneNumbers } = useRoomCreateContext();

  return (
    <div className='flex w-fit gap-2'>
      <div className='w-50'>
        <Input
          id='co-founder'
          placeholder='전화번호'
          type='phone'
          className='h-12'
          value={value}
          disabled={success}
          onChange={e => {
            const rawValue = e.target.value;
            const formattedValue = getFormattedPhone(rawValue);
            setValue(formattedValue);
          }}
        />
      </div>
      <button
        id='co-founder'
        type='button'
        className='bg-fill rounded-5 border-border hover:bg-sub cursor-pointer border-[1px] px-4 py-2'
        onClick={() => {
          if (phoneNumber === value)
            alert('자신의 번호는 친구로 추가할 수 없어요.');
          else {
            mutate(value, {
              onSuccess: data => {
                if (friendPhoneNumbers.includes(value))
                  alert('이미 추가한 친구입니다.');
                else if (data.result.gender !== gender)
                  alert('친구의 성별이 나와 달라요.');
                else if (
                  data.result.exist &&
                  !friendPhoneNumbers.includes(value)
                ) {
                  alert('친구를 추가했어요!');
                  setSuccess(true);
                  setFriendPhoneNumbers(prev => [...prev, value]);
                } else alert('가입하지 않은 친구입니다.');
              },
            });
          }
        }}
      >
        친구 추가
      </button>
    </div>
  );
};
