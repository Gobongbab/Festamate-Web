import React, { Fragment } from 'react';
import { useAtomValue } from 'jotai';

import { getDate } from '@/shared/utils';
import { userAtom } from '@/shared/atom';

import { useFetchChatDetail } from '@/widgets/chat/api';

export default function ChatContainer({ chatRoomId }: { chatRoomId: number }) {
  const { data } = useFetchChatDetail(chatRoomId);
  const userData = useAtomValue(userAtom);
  const { nickname } = userData!;

  return (
    <>
      {data?.pages.map(page => (
        <Fragment key={page.result.pageable.pageNumber}>
          <DateDivider date={page.result.content[0]?.sendDate} />
          {page.result.content.map(message => (
            <Fragment key={message.id}>
              {message.nickname === nickname ? (
                <SentText text={message.message} time={message.sendDate} />
              ) : (
                <RecievedText text={message.message} time={message.sendDate} />
              )}
            </Fragment>
          ))}
        </Fragment>
      ))}
      <div className='mb-26' />
    </>
  );
}

const RecievedText = ({ text, time }: { text: string; time: string }) => (
  <div className='flex w-full items-end gap-2'>
    <div className='border-border bg-sub w-fit max-w-[80%] rounded-tl-2xl rounded-r-2xl px-4 py-2'>
      {text}
    </div>
    <span className='text-light text-sm'>{getDate(time, 'A h:mm')}</span>
  </div>
);

const SentText = ({ text, time }: { text: string; time: string }) => (
  <div className='flex w-full items-end justify-end gap-2'>
    <span className='text-light text-sm'>{getDate(time, 'A h:mm')}</span>
    <div className='border-border bg-point/80 max-w-[80%] rounded-l-2xl rounded-tr-2xl px-4 py-2 text-wrap text-white'>
      {text}
    </div>
  </div>
);

const DateDivider = ({ date }: { date?: string }) => {
  if (!date) return null;

  return (
    <div className='text-light/80 my-4 flex w-full items-center gap-3 py-1 text-sm'>
      <div className='bg-light/20 h-[0.5px] flex-1' />
      <span>{getDate(new Date(date), 'YYYY년 M월 D일 dddd')}</span>
      <div className='bg-light/20 h-[0.5px] flex-1' />
    </div>
  );
};
