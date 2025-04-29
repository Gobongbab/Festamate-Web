import React from 'react';

import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';

export default function ChatListContainer() {
  return (
    <div className='flex flex-col'>
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
    </div>
  );
}

const ChatRoomItem = () => {
  const { push } = useFlow();

  return (
    <button
      name={`chat`}
      className='hover:bg-sub active:bg-sub grid h-28 w-full cursor-pointer grid-cols-[1fr_4fr] gap-3 px-6 py-2 focus:outline-none'
      onClick={() => push(PATH.CHAT, { chatRoomId: 47 })}
    >
      <div className='flex size-full items-center'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzXy3zN565cKcPizT-NFsxsUg_X4zzAyKUNg&s'
          className='rounded-10 size-18'
        />
      </div>
      <div className='flex h-full flex-col justify-center gap-y-2 overflow-hidden'>
        <div className='flex w-full items-end justify-between'>
          <span className='text-lg font-semibold'>맞다이 까실 분</span>
          <span className='text-light text-sm font-light'>오후 6:00</span>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='text-light flex w-full justify-between'>
            그럼 여기서 만날까요?
          </div>
        </div>
      </div>
    </button>
  );
};
