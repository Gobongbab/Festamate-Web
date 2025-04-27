import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';

import { Dock, NormalAppBar } from '@/shared/ui';
import { useStack } from '@stackflow/react';
import { ChatListContainer } from '@/widgets/chat/ui';

export default function ChatListScreen() {
  const stack = useStack();
  const isLoading = stack.globalTransitionState === 'loading';

  return (
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen appBar={NormalAppBar('채팅')}>
        <div className='scrollbar-hide container-mobile gap-y-normal-spacing pb-dock-height flex size-full flex-col overflow-scroll overflow-y-scroll pt-0'>
          <ChatListContainer />
        </div>
      </AppScreen>
      <Dock isLoading={isLoading} />
    </div>
  );
}
