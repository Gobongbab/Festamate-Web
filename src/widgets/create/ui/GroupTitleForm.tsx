import React from 'react';

import { FormItem, Input } from '@/shared/ui';

export default function GroupTitleForm() {
  return (
    <>
      <FormItem title='모임방 제목' childrenWrapper={false}>
        <Input id='group-title' placeholder='제목을 입력해주세요.' />
      </FormItem>
      <FormItem title='모임방 설명' childrenWrapper={false}>
        <textarea
          id='group-desc'
          name='group-desc'
          placeholder='설명을 입력해주세요.'
          className='bg-fill border-border rounded-5 h-60 w-full resize-none border-[1px] px-4 py-2 focus:outline-none'
        />
      </FormItem>
    </>
  );
}
