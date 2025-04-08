import React from 'react';

import { ListItem, ListSkeleton } from '@/shared/ui';
import { PathItem } from '../types';
import { useFlow } from '@/app/stackflow';
import { useRoomList } from '@/shared/api';

interface GroupListProps {
  label: string;
  to: PathItem;
  request: string;
}

const GROUP_LIST_SKELETON_COUNT = 6;

export default function GroupList({ label, to, request }: GroupListProps) {
  const { data, isLoading } = useRoomList(request);
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
        {data && (
          <>
            {rooms.length === 0 ? (
              <div className='grid h-30 items-center'>{label}이 없어요!</div>
            ) : (
              rooms.map(room => <ListItem key={room.id} {...room} />)
            )}
          </>
        )}
        {isLoading && <GroupListSkeleton />}
      </div>
    </div>
  );
}

const GroupListSkeleton = () => (
  <>
    {Array.from({ length: GROUP_LIST_SKELETON_COUNT }).map((_, i) => (
      <ListSkeleton key={i} />
    ))}
  </>
);
