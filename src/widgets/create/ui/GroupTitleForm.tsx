import React from 'react';

import { FormItem, Input } from '@/shared/ui';

export default function GroupTitleForm() {
  return (
    <>
      <FormItem title='모임방 이름' childrenWrapper={false}>
        <Input
          id='group-title'
          placeholder='어떤 모임인지 간단하게 설명해주세요.'
        />
      </FormItem>
      <FormItem title='모임방 설명' childrenWrapper={false}>
        <textarea
          id='group-desc'
          name='group-desc'
          placeholder='설명을 입력해주세요.'
          className='border-border rounded-5 h-60 w-full resize-none border-[1px] px-4 py-2 focus:outline-none'
        />
      </FormItem>
    </>
  );
}
