import { Button, Input } from '@/shared/ui';
import React from 'react';

export default function ChatInput() {
  return (
    <div className='border-app-bar-border fixed right-0 bottom-0 left-0 grid h-fit grid-cols-[5fr_1fr] gap-2 border-t-[1px] bg-white px-6 pt-3 pb-12'>
      <Input
        className='bg-sub h-10 w-full border-none'
        placeholder='메시지 입력'
      />
      <Button size='sm' label='전송' className='h-10 w-full' />
    </div>
  );
}
