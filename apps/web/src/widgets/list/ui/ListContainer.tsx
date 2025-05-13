import React, { useCallback, useRef, useEffect } from 'react';

import { ListItem, ListSkeleton } from '@/shared/ui';
import { useInfiniteRooms } from '@/widgets/list/api';

export default function ListContainer({ request }: { request: string }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteRooms(request);

  const observer = useRef<IntersectionObserver | undefined>(undefined);
  const lastRoomRef = useCallback(
    (node: HTMLElement | null) => {
      if (!hasNextPage || isLoading || isFetchingNextPage) {
        if (observer.current) {
          observer.current.disconnect();
          observer.current = undefined;
        }
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage)
            fetchNextPage();
        },
        { threshold: 0.7 },
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading],
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

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
            {...room}
            key={room.id}
            ref={index === rooms.length - 1 ? lastRoomRef : null}
          />
        ))}
      {data && rooms.length === 0 && <div>방이 없어요!</div>}
    </>
  );
}
