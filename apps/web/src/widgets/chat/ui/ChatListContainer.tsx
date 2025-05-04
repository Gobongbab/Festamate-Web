import React from 'react';

import { getDate } from '@festamate/utils';

import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';

import { ChatRoom } from '@/widgets/chat/types';
import { useFetchChatRooms } from '@/widgets/chat/api';

export default function ChatListContainer() {
  const { data } = useFetchChatRooms();
  return (
    <div className='flex flex-col'>
      {data ? (
        data.pages[0].result.content.map(chatRoom => (
          <ChatRoomItem key={chatRoom.id} {...chatRoom} />
        ))
      ) : (
        <span className='text-light'>채팅방 불러오는 중..</span>
      )}
    </div>
  );
}

const ChatRoomItem = ({
  id,
  title,
  lastMessageContent,
  lastMessageTime,
}: ChatRoom) => {
  const { push } = useFlow();

  return (
    <button
      name={`chat`}
      className='hover:bg-sub active:bg-sub grid h-28 w-full cursor-pointer grid-cols-[1fr_4fr] gap-3 px-6 py-2 focus:outline-none'
      onClick={() => push(PATH.CHAT, { chatRoomId: id })}
    >
      <div className='flex size-full items-center'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzXy3zN565cKcPizT-NFsxsUg_X4zzAyKUNg&s'
          className='rounded-10 size-18'
        />
      </div>
      <div className='flex h-full flex-col justify-center gap-y-2 overflow-hidden'>
        <div className='flex w-full items-end justify-between'>
          <span className='text-lg font-semibold'>{title}</span>
          <span className='text-light text-sm font-light'>
            {getDate(lastMessageTime, 'A HH시 mm분')}
          </span>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='text-light flex w-full justify-between'>
            {lastMessageContent}
          </div>
        </div>
      </div>
    </button>
  );
};
