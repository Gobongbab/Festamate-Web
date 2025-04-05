import React from 'react';

import { useFlow } from '@/app/stackflow';

import { Card } from '@/shared/ui';
import { PathItem } from '@/shared/types';
import { cn } from '@/shared/utils';

interface GroupCarouselProps {
  label: string;
  to: PathItem;
  covered?: boolean;
}
export default function GroupCarousel({
  label,
  to,
  covered = false,
}: GroupCarouselProps) {
  const arr = Array.from({ length: 7 });
  const { push } = useFlow();

  return (
    <div className='flex w-full flex-col gap-y-3'>
      <div className='flex items-baseline justify-between gap-x-2'>
        <span className='text-lg font-semibold'>{label}</span>
        <button
          name='more'
          className='focus;outline-none text-light hover:text-dark cursor-pointer text-sm'
          onClick={() => push(to, { title: label })}
          disabled={covered}
        >
          <u>더보기</u>
        </button>
      </div>
      <div
        className={cn(
          'scrollbar-hide h-card-height rounded-10 relative flex items-center gap-x-3',
          covered ? 'overflow-hidden' : 'overflow-x-scroll',
        )}
      >
        {arr.map((_, i) => (
          <Card key={i} />
        ))}
        {covered && (
          <div className='absolute inset-0 z-60 grid size-full place-items-center bg-black/1 backdrop-blur-sm'>
            <div className='flex flex-col items-center gap-2'>
              <p className='text-center text-white'>
                간편 로그인을 통해 로그인하고,
                <br />
                추천 모임방을 확인하세요!
              </p>
              <button
                name='next-step'
                className='bg-fill/80 border-border rounded-5 w-fit cursor-pointer border-[1px] p-2 px-4'
              >
                로그인 하러가기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
