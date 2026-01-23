import React, { useCallback, useRef, useEffect } from 'react';

import { RoomListItem, RoomListSkeleton } from '@/widgets/room-list/ui';
import { RoomListItem as RoomListItemType } from '@/shared/types';

interface PageData {
  content: RoomListItemType[];
}

interface InfiniteData {
  pages: PageData[];
}

interface RoomListProps {
  data: InfiniteData | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export default function RoomListInfinite({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isError,
  error,
  refetch,
}: RoomListProps) {
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
          <p>{error?.message || '방 목록을 불러오는데 실패했습니다.'}</p>
          <button onClick={() => refetch()}>다시 시도하기</button>
        </div>
      )}
      {isLoading && (
        <div className='flex h-fit w-full flex-col gap-0'>
          <RoomListSkeleton /> <RoomListSkeleton /> <RoomListSkeleton />{' '}
          <RoomListSkeleton />
        </div>
      )}
      {data &&
        rooms.length > 0 &&
        rooms.map((room: RoomListItemType, index: number) => (
          <RoomListItem
            {...room}
            key={room.id}
            ref={index === rooms.length - 1 ? lastRoomRef : null}
          />
        ))}
      {data && rooms.length === 0 && <div>방이 없어요!</div>}
    </>
  );
}
