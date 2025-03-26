import React from 'react';

import { FormItem, Input } from '@/shared/ui';

export default function GroupTitleForm() {
  return (
    <>
      <FormItem title='모임방 제목' childrenWrapper={false}>
        <Input placeholder='제목을 입력해주세요.' />
      </FormItem>
      <FormItem title='모임방 설명' childrenWrapper={false}>
        <Input placeholder='설명을 입력해주세요.' />
      </FormItem>
    </>
  );
}
