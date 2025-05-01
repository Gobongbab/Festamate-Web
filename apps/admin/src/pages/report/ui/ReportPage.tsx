import React, { useState } from 'react';

import { PageHeader } from '@/shared/ui';
import { ReportTable } from '@/features/report/ui';
import { cn } from '@festamate/utils';

export default function ReportPage() {
  const [filtered, setFiltered] = useState<boolean>(false);

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader
        title='신고 조회하기'
        description='현재 발생한 모든 신고를 조회합니다.'
      />
      <button
        name='filterReports'
        className={cn(
          'border-border rounded-10 hover:bg-sub w-fit cursor-pointer border-[1px] px-4 py-2 font-medium transition duration-150 focus:outline-none',
          filtered && 'text-point bg-point/10',
        )}
        onClick={() => setFiltered(prev => !prev)}
      >
        미처리 신고만 보기
      </button>
      <ReportTable filtered={filtered} />
    </div>
  );
}
