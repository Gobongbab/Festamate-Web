import React from 'react';

import { cn } from '@/shared/utils';

import { FormItem, Input } from '@/shared/ui';
import { type UseFormWatch, type UseFormRegister } from 'react-hook-form';
import { Room } from '../types';
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
      <FormItem title='모임방 이름'>
        <Input
          id='title'
          placeholder='어떤 모임인지 간단하게 설명해주세요.'
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
            'border-border rounded-5 h-60 w-full resize-none border-[1px] px-4 py-2 focus:outline-none',
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
