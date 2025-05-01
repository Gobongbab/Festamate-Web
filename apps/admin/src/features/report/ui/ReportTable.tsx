import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { cn, getDate } from '@festamate/utils';

import { Report } from '@/features/report/types';
import { REASON, REPORT_TABLE } from '@/features/report/model';

export default function ReportTable({ filtered }: { filtered: boolean }) {
  const data: Report[] = useLoaderData();
  const reports = filtered ? data.filter(d => !d.processed) : data;

  return (
    <div className='border-border overflow-hidden rounded-lg border'>
      <table className='divide-border min-w-full table-auto divide-y'>
        <ReportHeader />
        <tbody className='divide-border divide-y bg-white'>
          {reports.map(report => (
            <ReportItem key={report.id} report={report} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ReportHeader = () => (
  <thead className='bg-sub'>
    <tr>
      {REPORT_TABLE.map(({ key, width, label }) => (
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

const ReportItem = ({ report }: { report: Report }) => {
  const renderValue = (key: string) => {
    if (key === 'processed') return report[key] ? '완료' : '미처리';
    if (key === 'reportDate') return getDate(report[key], 'YYYY년 M월 D일');
    if (key === 'reason') return REASON[report[key]];
    return report[key as keyof Report];
  };

  return (
    <tr className='hover:bg-sub cursor-pointer'>
      {REPORT_TABLE.map(({ key, width }, i) => (
        <td
          key={key}
          className={cn(
            width,
            'whitespace-nowrap p-2 text-center text-gray-900',
            i === REPORT_TABLE.length - 1 ? '' : 'border-border border-r-[1px]',
          )}
        >
          {renderValue(key)}
        </td>
      ))}
    </tr>
  );
};
