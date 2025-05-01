import { PageHeader } from '@/shared/ui';
import React from 'react';

export default function ReportPage() {
  return (
    <div className='flex flex-col gap-6'>
      <PageHeader
        title='신고 조회하기'
        description='현재 발생한 모든 신고를 조회합니다.'
      />
    </div>
  );
}
