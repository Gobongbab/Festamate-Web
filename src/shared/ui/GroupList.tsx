import React from 'react';

import { ListItem } from '@/shared/ui';
import { PathItem } from '../types';
import { useFlow } from '@/app/stackflow';
import { useRoomList } from '@/shared/api';

interface GroupListProps {
  label: string;
  to: PathItem;
  request: string;
}

export default function GroupList({ label, to, request }: GroupListProps) {
  const { data } = useRoomList(request);
  const { push } = useFlow();

  const rooms = data ? data.content : [];

  return (
    <div className='flex w-full flex-col gap-y-3'>
      <div className='flex items-baseline justify-between gap-x-2'>
        <span className='text-lg font-semibold'>{label}</span>
        <button
          name='more'
          className='text-light hover:text-dark cursor-pointer text-sm focus:outline-none'
          onClick={() => push(to, { title: label })}
        >
          <u>더보기</u>
        </button>
      </div>
      <div className='flex flex-col items-center gap-1.5'>
        {rooms.map(room => (
          <ListItem key={room.id} {...room} />
        ))}
      </div>
    </div>
  );
}
