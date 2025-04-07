import React from 'react';

import { cn } from '@/shared/utils';

import { FormItem, Input } from '@/shared/ui';
import { type UseFormWatch, type UseFormRegister } from 'react-hook-form';
import { Room } from '@/shared/types';
import { CONTENT_MAX_LENGTH, TITLE_MAX_LENGTH } from '../model';

interface GroupTitleFormProps {
  register: UseFormRegister<Room>;
  watch: UseFormWatch<Room>;
}

export default function GroupTitleForm({
  register,
  watch,
}: GroupTitleFormProps) {
  const { title, content } = watch();

  return (
    <>
      <FormItem
        title='모임방 이름'
        description='모임방 이름은 꼭 5자 이상으로 작성해주세요!'
      >
        <Input
          id='title'
          placeholder='모임방에 대해 간단하게 설명해주세요. ex) 체대 주점 가실 분..'
          value={title}
          maxLength={TITLE_MAX_LENGTH}
          {...register('title', { required: true })}
        />
      </FormItem>
      <FormItem title='모임방 설명'>
        <textarea
          id='content'
          placeholder='설명을 입력해주세요.'
          {...register('content', { required: true })}
          className={cn(
            'border-border rounded-5 text-md h-64 w-full resize-none border-[1px] px-4 py-3 focus:outline-none',
            content.length > CONTENT_MAX_LENGTH && 'border-important shake',
          )}
        />
        <div
          className={cn(
            'text-light flex justify-end',
            content.length > CONTENT_MAX_LENGTH && 'text-important',
          )}
        >
          {content.length}/{CONTENT_MAX_LENGTH}
        </div>
      </FormItem>
    </>
  );
}
