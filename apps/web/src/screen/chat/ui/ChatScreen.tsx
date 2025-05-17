/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';

import { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { ChatContainer, ChatInput } from '@/widgets/chat/ui';
import { useWebSocket } from '@/shared/hook';
import { useFetchChatDetail } from '@/widgets/chat/api';
import { Message } from '@/widgets/chat/types';

const ChatScreen: ActivityComponentType<{ chatRoomId: number }> = ({
  params,
}: {
  params: { chatRoomId: number };
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchChatDetail(params.chatRoomId);
  const [chatData, setChatData] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevScrollHeight = useRef<number>(0);

  useEffect(() => {
    if (data?.pages) {
      const allMessages = data.pages
        .flatMap(page => page.result.content)
        .sort(
          (a, b) =>
            new Date(a.sendDate).getTime() - new Date(b.sendDate).getTime(),
        );
      setChatData(allMessages);
    }
  }, [data]);

  // useLayoutEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //   }
  // }, [data]);

  // useEffect(() => {
  //   const scroll = scrollRef.current;
  //   if (!scroll || !hasNextPage) return;

  //   const onScroll = async () => {
  //     if (scroll.scrollTop <= 20 && hasNextPage && !isFetchingNextPage) {
  //       prevScrollHeight.current = scroll.scrollHeight;

  //       await fetchNextPage();

  //       if (scrollRef.current) {
  //         const newScrollHeight = scrollRef.current.scrollHeight;
  //         scrollRef.current.scrollTop =
  //           newScrollHeight - prevScrollHeight.current;
  //       }
  //     }
  //   };

  //   scroll.addEventListener('scroll', onScroll);
  //   return () => scroll.removeEventListener('scroll', onScroll);
  // }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const { sendMessage } = useWebSocket({
    chatRoomId: params.chatRoomId,
    onMessage: message => {
      setChatData(prev => [...prev, message]);
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    },
  });

  return (
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen>
        <div className='container-mobile p-normal-padding flex size-full flex-col pt-0 pb-0'>
          <div
            ref={scrollRef}
            className='scrollbar-hide flex flex-1 flex-col gap-y-3 overflow-y-auto'
          >
            <ChatContainer data={chatData} />
          </div>
          <ChatInput onSendMessage={sendMessage} setData={setChatData} />
        </div>
      </AppScreen>
    </div>
  );
};

export default ChatScreen;
