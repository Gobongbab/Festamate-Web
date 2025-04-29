import React from 'react';

// import { ListItem } from '@/shared/ui';

interface ResultContainerParams {
  searchKey: string;
}

export default function ResultContainer({ searchKey }: ResultContainerParams) {
  const result = Array.from({ length: 9 }, (_, i) => i);

  return (
    <>
      <p className='text-lg'>
        "<b>{searchKey}</b>" 에 대한 검색 결과입니다.
      </p>
      <div className='flex flex-col gap-1.5'>
        {result.map(result => (
          <div key={result} />
        ))}
      </div>
    </>
  );
}
