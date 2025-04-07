import React, { useCallback, useRef } from 'react';

import { ListItem, ListSkeleton } from '@/shared/ui';
import { useInfiniteRooms } from '@/widgets/list/api';

export default function ListContainer() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteRooms();

  const observer = useRef<IntersectionObserver | undefined>(undefined);
  const lastRoomRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  const rooms = data ? data.pages.flatMap(page => page.content) : [];

  return (
    <>
      {isError && (
        <div className='error-message'>
          <p>{error.message || '방 목록을 불러오는데 실패했습니다.'}</p>
          <button onClick={() => refetch()}>다시 시도하기</button>
        </div>
      )}
      {isLoading && (
        <div className='flex h-fit w-full flex-col gap-0'>
          <ListSkeleton /> <ListSkeleton /> <ListSkeleton /> <ListSkeleton />
        </div>
      )}
      {data &&
        rooms.length > 0 &&
        rooms.map((room, index) => (
          <ListItem
            key={room.id}
            ref={index === rooms.length - 1 ? lastRoomRef : null}
          />
        ))}
    </>
  );
}
