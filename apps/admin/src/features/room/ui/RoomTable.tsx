import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { cn, getDate } from '@festamate/utils';

import { RoomListItem, RoomStatus } from '@/features/room/types';

const ROOM_TABLE = [
  { key: 'id', width: 'w-20', label: 'ID' },
  { key: 'title', width: 'w-40', label: '방 제목' },
  { key: 'currentParticipants', width: 'w-20', label: '참가자 수' },
  { key: 'maxParticipants', width: 'w-20', label: '최대 인원' },
  { key: 'status', width: 'w-20', label: '상태' },
  { key: 'meetingDateTime', width: 'w-40', label: '만남 시간' },
  { key: 'deleteRoomButton', width: 'w-20', label: '삭제하기' },
] as const;

const STATUS_MAP: Record<RoomStatus, string> = {
  MATCHING: '매칭 중',
  MATCHED: '매칭 완료',
  CLOSED: '종료',
};

export default function RoomTable() {
  const data = useLoaderData();

  return (
    <div className='border-border overflow-hidden rounded-lg border'>
      <table className='divide-border min-w-full table-auto divide-y'>
        <RoomHeader />
        <tbody className='divide-border divide-y bg-white'>
          {data.content.map((room: RoomListItem) => (
            <RoomItem key={room.id} room={room} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const RoomHeader = () => (
  <thead className='bg-sub'>
    <tr>
      {ROOM_TABLE.map(({ key, width, label }) => (
        <th
          key={key}
          scope='col'
          className={cn(width, 'py-2 text-center font-medium text-gray-500')}
        >
          {label}
        </th>
      ))}
    </tr>
  </thead>
);

const RoomItem = ({ room }: { room: RoomListItem }) => {
  const renderValue = (key: string) => {
    if (key === 'meetingDateTime')
      return getDate(room[key], 'YYYY년 M월 D일 HH:mm');
    if (key === 'status') return STATUS_MAP[room[key]];
    if (key === 'thumbnail') return room[key].name;
    if (key === 'deleteRoomButton')
      return (
        <button
          name='deleteRoom'
          className='hover:text-important w-full cursor-pointer text-sm transition duration-150'
        >
          삭제
        </button>
      );
    return room[key as keyof RoomListItem];
  };

  return (
    <tr className='hover:bg-sub cursor-pointer'>
      {ROOM_TABLE.map(({ key, width }, i) => (
        <td
          key={key}
          className={cn(
            width,
            'whitespace-nowrap p-2 text-center',
            i === ROOM_TABLE.length - 1 ? '' : 'border-border border-r-[1px]',
          )}
        >
          <>{renderValue(key)}</>
        </td>
      ))}
    </tr>
  );
};
