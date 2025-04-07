import React from 'react';

export default function ListSkeleton() {
  return (
    <div className='rounded-10 grid h-28 w-full cursor-pointer grid-cols-[1fr_4fr] gap-3 py-3'>
      <div className='rounded-5 skeleton h-full' />
      <div className='flex h-full flex-col justify-between'>
        <div className='flex flex-col gap-3'>
          <p className='skeleton h-6 w-[80%]' />
          <p className='skeleton h-8 w-full overflow-hidden text-nowrap text-ellipsis' />
        </div>
      </div>
    </div>
  );
}
