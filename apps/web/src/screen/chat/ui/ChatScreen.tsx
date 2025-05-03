import React, { useEffect, useState } from 'react';

import { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { RoomAppBar } from '@/shared/ui';
import { ChatContainer, ChatInput } from '@/widgets/chat/ui';
import { useWebSocket } from '@/shared/hook';
import { useFetchChatDetail } from '@/widgets/chat/api';
import { Message } from '@/widgets/chat/types';

const ChatScreen: ActivityComponentType<{ chatRoomId: number }> = ({
  params,
}: {
  params: { chatRoomId: number };
}) => {
  const { data } = useFetchChatDetail(params.chatRoomId);
  const chats = data?.pages[0].result.content;
  const [chatData, setChatData] = useState<Message[]>([]);

  useEffect(() => {
    if (chats) setChatData(chats);
  }, [chats]);

  const { sendMessage } = useWebSocket({
    chatRoomId: params.chatRoomId,
    onMessage: message => {
      setChatData(prev => [...prev, message]);
    },
  });

  return (
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen appBar={RoomAppBar(() => {})}>
        <div className='scrollbar-hide container-mobile p-normal-padding flex size-full flex-col gap-y-3 overflow-scroll overflow-y-scroll pt-0 pb-0'>
          <ChatContainer data={chatData} />
          <ChatInput onSendMessage={sendMessage} setData={setChatData} />
        </div>
      </AppScreen>
    </div>
  );
};

export default ChatScreen;
