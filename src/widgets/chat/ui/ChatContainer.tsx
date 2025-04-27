import React from 'react';

import { getDate } from '@/shared/utils';

export default function ChatContainer() {
  return (
    <>
      <DateDivider />
      <RecievedText text='안녕하세요~!' />
      <SentText text='안녕하세요ㅎㅎ' />
      <DateDivider />
      <RecievedText text='오 생각보다 빨리 오셨네요!' />
      <SentText text='근처에 있어서요ㅋㅋ' />
      <RecievedText text='다행이에요. 날씨도 좋고ㅎㅎ' />
      <SentText text='맞아요, 산책하기 딱이던데요.' />
      <RecievedText text='ㅋㅋㅋ 그러니까요. 커피는 드셨어요?' />
      <SentText text='아뇨 아직! 같이 마시려고 기다렸죠.' />
      <RecievedText text='오 센스 좋은데요ㅋㅋ' />
      <SentText text='칭찬 감사합니다😊' />
      <RecievedText text='혹시 커피는 어떤 거 좋아하세요?' />
      <SentText text='저는 아메리카노파에요ㅋㅋ 깔끔한 거 좋아해서.' />
      <RecievedText text='오 저도 아메리카노 좋아해요! 입맛 잘 맞겠는데요?' />
      <SentText text='벌써 통했네요ㅋㅋ' />
      <RecievedText text='ㅋㅋㅋ 그러게요. 근데 평소에 커피 많이 드세요?' />
      <SentText text='음.. 하루 한 잔 정도? 카페 가는 건 좋아하는 편이에요.' />
      <RecievedText text='오 저랑 비슷해요ㅎㅎ 저도 카페 자주 가요.' />
      <SentText text='좋네요! 나중에 괜찮으면 추천해주실 카페도 알려주세요.' />
      <RecievedText text='완전 좋죠! 리스트 만들어놓을게요ㅋㅋ' />
      <SentText text='기대하겠습니다ㅋㅋ' />
      <div className='mb-26' />
    </>
  );
}

const RecievedText = ({ text }: { text: string }) => (
  <div className='flex w-full items-end gap-2'>
    <div className='border-border bg-sub w-fit max-w-[80%] rounded-tl-2xl rounded-r-2xl px-4 py-2'>
      {text}
    </div>
    <span className='text-light text-sm'>오후 6:38</span>
  </div>
);

const SentText = ({ text }: { text: string }) => (
  <div className='flex w-full items-end justify-end gap-2'>
    <span className='text-light text-sm'>오후 6:38</span>
    <div className='border-border bg-point/80 max-w-[80%] rounded-l-2xl rounded-tr-2xl px-4 py-2 text-wrap text-white'>
      {text}
    </div>
  </div>
);

const DateDivider = () => (
  <div className='text-light/80 my-4 flex w-full items-center gap-3 py-1 text-sm'>
    <div className='bg-light/20 h-[0.5px] flex-1' />
    <span> {getDate(new Date(), 'YYYY년 M월 D일 dddd')}</span>
    <div className='bg-light/20 h-[0.5px] flex-1' />
  </div>
);
