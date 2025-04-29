import React from 'react';

import { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { RoomAppBar } from '@/shared/ui';
import { ChatContainer, ChatInput } from '@/widgets/chat/ui';
import { useWebSocket } from '@/shared/hook';

const ChatScreen: ActivityComponentType<{ chatRoomId: number }> = ({
  params,
}: {
  params: { chatRoomId: number };
}) => {
  const { sendMessage } = useWebSocket({
    chatRoomId: params.chatRoomId,
    onMessage: message => {
      console.log(message);
    },
  });

  return (
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen appBar={RoomAppBar(() => {})}>
        <div className='scrollbar-hide container-mobile p-normal-padding flex size-full flex-col gap-y-3 overflow-scroll overflow-y-scroll pt-0 pb-0'>
          <ChatContainer chatRoomId={params.chatRoomId} />
          <ChatInput onSendMessage={sendMessage} />
        </div>
      </AppScreen>
    </div>
  );
};

export default ChatScreen;
