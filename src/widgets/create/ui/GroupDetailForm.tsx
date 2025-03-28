import React from 'react';

import { FormItem, Input, Radio } from '@/shared/ui';

export default function GroupDetailForm() {
  return (
    <>
      <FormItem
        title='인원 선택'
        description='1:1은 2명, 2:2는 4명, 3:3은 6명을 선택해주세요.'
        childrenWrapper={false}
      >
        <Radio id='people-2' label='2명' />
        <Radio id='people-4' label='4명' />
        <Radio id='people-6' label='6명' />
      </FormItem>
      <FormItem
        title='성별 선택'
        description='모임방에 들어올 구성원들의 성별을 선택해주세요.'
        childrenWrapper={false}
      >
        <Radio id='male' label='남자' />
        <Radio id='female' label='여자' />
        <Radio id='whatever' label='무관' />
      </FormItem>
      <FormItem
        title='연락 수단'
        description='구성원들에게 연락할 수 있는 링크를 알려주세요.'
        childrenWrapper={false}
      >
        <Input placeholder='링크를 입력해주세요.' />
      </FormItem>
      <FormItem
        title='모임 날짜'
        description='모임 날짜를 입력해주세요'
        childrenWrapper={false}
      >
        <Input placeholder='DatePicker 개발 예정' />
      </FormItem>
    </>
  );
}
