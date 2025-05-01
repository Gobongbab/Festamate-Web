import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { cn, getDate } from '@festamate/utils';

import { Report } from '@/features/report/types';
import { REPORT_COLUMNS } from '@/features/report/model';

export default function ReportTable() {
  const data: Report[] = useLoaderData();

  return (
    <div className='border-border overflow-hidden rounded-lg border'>
      <table className='divide-border min-w-full table-fixed divide-y'>
        <ReportHeader />
        <tbody className='divide-border divide-y bg-white'>
          {data.map(report => (
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
      {REPORT_COLUMNS.map(({ key, width, label }) => (
        <th
          key={key}
          scope='col'
          className={cn(
            width,
            'py-2 text-center text-sm font-medium text-gray-500',
          )}
        >
          {label}
        </th>
      ))}
    </tr>
  </thead>
);

const ReportItem = ({ report }: { report: Report }) => (
  <tr className='hover:bg-sub cursor-pointer'>
    {REPORT_COLUMNS.map(({ key, width }, i) => (
      <td
        key={key}
        className={cn(
          width,
          'whitespace-nowrap p-2 text-center text-gray-900',
          i !== REPORT_COLUMNS.length ? 'border-border border-r-[1px]' : '',
        )}
      >
        {key === 'processed'
          ? report[key]
            ? '완료'
            : '미처리'
          : key === 'reportDate'
            ? getDate(report[key], 'YYYY년 M월 D일')
            : report[key]}
      </td>
    ))}
  </tr>
);
