import React from 'react';

import { Card } from '@/shared/ui';

interface ResultContainerParams {
  searchKey: string;
}

export default function ResultContainer({ searchKey }: ResultContainerParams) {
  const result = Array.from({ length: 9 }, (_, i) => i);

  return (
    <>
      <p className='text-md'>
        "<b>{searchKey}</b>" 에 대한 검색 결과입니다.
      </p>
      <div className='grid grid-cols-2 gap-3'>
        {result.map(result => (
          <Card key={result} sizePreset={false} />
        ))}
      </div>
    </>
  );
}
