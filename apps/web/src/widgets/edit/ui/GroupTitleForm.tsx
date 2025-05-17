import React, { ChangeEvent } from 'react';
import type { UseFormWatch, UseFormRegister } from 'react-hook-form';

import { cn } from '@festamate/utils';

import { FormItem, Input } from '@/shared/ui';
import { Room } from '@/shared/types';
import {
  CONTENT_MAX_LENGTH,
  PLACE_MAX_LENGTH,
  TITLE_MAX_LENGTH,
} from '@/shared/constants';

import { useRoomEditContext } from '@/widgets/edit/model';

interface GroupTitleFormProps {
  register: UseFormRegister<Room>;
  watch: UseFormWatch<Room>;
}

export default function GroupTitleForm({
  register,
  watch,
}: GroupTitleFormProps) {
  const { setFile, image, setImage } = useRoomEditContext();
  const { title, place, content } = watch();

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

  return (
    <div className='flex flex-col gap-y-2'>
      <FormItem
        title='모임 표지 사진'
        description='사진을 등록하지 않으면 기본 이미지로 자동 설정됩니다.'
        className='mb-3'
      >
        <label htmlFor='file'>
          <input
            id='file'
            type='file'
            className='hidden'
            accept='image/*'
            onChange={handleImageInputChange}
          />
          <div
            className='border-border rounded-5 grid h-20 w-40 place-items-center border-[1px] bg-cover bg-center'
            style={{ backgroundImage: `url(${image ?? ''})` }}
          >
            {!image && (
              <span className='text-light font-light'>이미지 추가하기</span>
            )}
          </div>
        </label>
      </FormItem>
      <FormItem
        title='모임 이름'
        description='모임 이름은 꼭 5자 이상으로 작성해주세요!'
      >
        <Input
          id='title'
          placeholder='ex) 체대 주점 가실 분!'
          value={title}
          maxLength={TITLE_MAX_LENGTH}
          {...register('title', { required: true })}
          className='h-12'
        />
      </FormItem>
      <FormItem title='만남 장소' description='간단하고 명확하게 작성해주세요!'>
        <Input
          id='place'
          placeholder='ex) 종강 카페 앞, 도서관 앞'
          value={place}
          maxLength={PLACE_MAX_LENGTH}
          {...register('place', { required: true })}
          className='h-12'
        />
      </FormItem>
      <FormItem title='모임 설명' className='mb-normal-spacing'>
        <textarea
          id='content'
          placeholder='설명을 입력해주세요.'
          {...register('content', { required: true })}
          className={cn(
            'border-border rounded-5 text-md h-48 w-full resize-none border-[1px] px-4 py-3 focus:outline-none',
            content.length > CONTENT_MAX_LENGTH && 'border-important shake',
          )}
        />
        <div
          className={cn(
            'text-light flex justify-end text-sm',
            content.length > CONTENT_MAX_LENGTH && 'text-important',
          )}
        >
          {content.length}/{CONTENT_MAX_LENGTH}
        </div>
      </FormItem>
    </div>
  );
}
