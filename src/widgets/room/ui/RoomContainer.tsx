import React from 'react';

import { Button, FormItem } from '@/shared/ui';
import { UserItem, RoomHeader } from '@/widgets/room/ui';
import { ROOM_MAKERS, ROOM_PARTICIPANTS } from '@/mock';

export default function RoomContainer() {
  return (
    <div className='flex size-full flex-col justify-between'>
      <div className='scrollbar-hide flex flex-col gap-y-6 overflow-scroll'>
        <RoomHeader />
        <div className='border-sub flex h-fit w-full border-b-2 pb-6'>
          컴공 봄부스에서 닭강정한대요@ 컴공 봄부스에서 닭강정한대요@ 컴공
          봄부스에서 닭강정한대요@ 컴공 봄부스에서 닭강정한대요@ 컴공 봄부스에서
          닭강정한대요@ 사실 저도 잘 모르는데 같이 가서 보면 좋을 것 같아요!
        </div>
        <FormItem title='모임을 연 멤버'>
          {ROOM_MAKERS.map(m => (
            <UserItem {...m} key={m.id} />
          ))}
        </FormItem>
        <FormItem title='모임에 참여한 멤버'>
          {ROOM_PARTICIPANTS.map(m => (
            <UserItem {...m} key={m.id} />
          ))}
        </FormItem>
        <div className='h-normal-spacing' />
      </div>
      <div className='z-30 flex h-16 w-full flex-shrink-0 gap-x-3 text-lg font-semibold text-white'>
        <Button name='room-participate' label='참여하기' halfWidth />
        <Button
          name='room-participate-with-friend'
          label='친구와 함께 참여하기'
          halfWidth
        />
      </div>
    </div>
  );
}
