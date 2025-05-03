import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';

import { Button, Input } from '@/shared/ui';
import { Message } from '../types';

interface ChatInputProps {
  onSendMessage: (
    message: string,
    setData: Dispatch<SetStateAction<Message[]>>,
  ) => void;
  setData: Dispatch<SetStateAction<Message[]>>;
}

export default function ChatInput({ onSendMessage, setData }: ChatInputProps) {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim(), setData);
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='border-app-bar-border fixed right-0 bottom-0 left-0 grid h-24 grid-cols-[5fr_1fr] gap-2 border-t-[1px] bg-white px-6 pt-3 pb-12'
    >
      <Input
        value={message}
        onChange={e => setMessage(e.target.value)}
        className='bg-sub h-10 w-full border-none'
        placeholder='메시지 입력'
      />
      <Button
        size='sm'
        label='전송'
        className='h-10 w-full'
        onClick={handleSubmit}
      />
    </form>
  );
}
