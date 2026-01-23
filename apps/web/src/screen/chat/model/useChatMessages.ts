import { useMemo } from 'react';
import { useAtomValue } from 'jotai';

import { getDate } from '@festamate/utils';
import { userAtom } from '@/shared/atom';
import { Message } from '@/screen/chat/types';

interface GroupedMessage extends Message {
  showDateDivider: boolean;
}

export const useChatMessages = (data: Message[]) => {
  const userData = useAtomValue(userAtom);
  const nickname = userData?.nickname || '';

  const groupedMessages = useMemo(() => {
    if (!data || data.length === 0) return [];

    let previousChatDate = '';
    
    return data.map((message) => {
      const currentDate = getDate(message.sendDate, 'YYYY.MM.DD');
      const showDateDivider = previousChatDate !== currentDate;
      previousChatDate = currentDate;

      return {
        ...message,
        showDateDivider,
      } as GroupedMessage;
    });
  }, [data]);

  const isSentByMe = (messageNickname: string) => messageNickname === nickname;

  return {
    groupedMessages,
    isSentByMe,
    nickname,
  };
};
