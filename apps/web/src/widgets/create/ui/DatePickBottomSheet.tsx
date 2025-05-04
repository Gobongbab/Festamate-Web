import React from 'react';

import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';

import { cn } from '@festamate/utils';

import { BottomSheet, Button } from '@/shared/ui';
import { useBottomSheet } from '@/shared/hook';
import { BOTTOM_SHEET } from '@/shared/constants';
import { useRoomCreateContext } from '@/widgets/create/model';

export default function DatePickBottomSheet() {
  const { closeBottomSheet, bottomSheetState } = useBottomSheet();
  const { isOpen } = bottomSheetState(BOTTOM_SHEET.DATE_PICKER);

  const handleClick = async () => {
    closeBottomSheet(BOTTOM_SHEET.DATE_PICKER);
  };

  return (
    <>
      {isOpen && (
        <BottomSheet sheetKey={BOTTOM_SHEET.DATE_PICKER}>
          <div className='flex items-baseline justify-between'>
            <span className='text-xl font-semibold'>날짜를 선택해 주세요!</span>
            <button
              className='text-md focus:outline-none'
              name='close-bottom-sheet'
              onClick={() => closeBottomSheet(BOTTOM_SHEET.DATE_PICKER)}
            >
              닫기
            </button>
          </div>
          <Calendar />
          <Button
            onClick={handleClick}
            size='lg'
            className='h-fit font-medium'
            label='날짜 선택하기'
            shadow={false}
          />
        </BottomSheet>
      )}
    </>
  );
}

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = () => {
  const { date, setDate } = useRoomCreateContext();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const today = new Date();

  const dayCnt = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const firstWeek = Array.from({ length: firstDay.getDay() }, () => '');

  const wholeDay = Array.from({ length: dayCnt }, (_, i) => i + 1);
  const lastWeek = Array.from(
    {
      length: (7 - ((firstWeek.length + wholeDay.length) % 7)) % 7,
    },
    () => '',
  );
  const formattedDay = [...firstWeek, ...wholeDay, ...lastWeek];
  const selectedDay = date.getDate();
  return (
    <div className='my-6'>
      <div className='my-2 flex w-full items-center justify-center gap-2 text-lg'>
        <button
          disabled={date.getMonth() <= today.getMonth()}
          className='disabled:text-border cursor-pointer pb-0.5 focus:outline-none'
          onClick={() => {
            const newDate = new Date(date);
            newDate.setMonth(currentMonth - 1);
            const todayStart = new Date(today);
            todayStart.setHours(0, 0, 0, 0);
            if (newDate < todayStart) setDate(today);
            else setDate(newDate);
          }}
        >
          <IoChevronBackSharp />
        </button>
        {currentYear}년 {currentMonth + 1}월
        <button
          className='cursor-pointer pb-0.5 focus:outline-none'
          onClick={() => {
            const newDate = new Date(date);
            newDate.setMonth(currentMonth + 1);
            setDate(newDate);
          }}
        >
          <IoChevronForwardSharp />
        </button>
      </div>
      <div className='flex'>
        {WEEK.map((w, i) => (
          <div
            key={w}
            className={cn(
              'flex w-34 justify-center py-2 text-sm font-light',
              i === 0 && 'text-important',
            )}
          >
            {w}
          </div>
        ))}
      </div>
      <div className='border-border grid grid-cols-7 gap-0 border-[1px] border-r-0 border-b-0'>
        {formattedDay.map(d => {
          const renderDate = new Date(currentYear, currentMonth, d as number);
          const todayStart = new Date(today);
          todayStart.setHours(0, 0, 0, 0);
          if (renderDate < todayStart)
            return (
              <div className='border-border box-border cursor-pointer border-r-[1px] border-b-[1px] p-3 font-light'>
                <button
                  disabled
                  className={cn(
                    d === selectedDay && 'bg-border',
                    'text-border grid size-8 place-items-center rounded-[50%]',
                  )}
                >
                  {d}
                </button>
              </div>
            );
          else
            return (
              <div className='border-border box-border cursor-pointer border-r-[1px] border-b-[1px] p-3 font-light'>
                <button
                  className={cn(
                    d === selectedDay && 'bg-border',
                    'active:bg-border/70 hover:bg-border/70 grid size-8 place-items-center rounded-[50%]',
                  )}
                  onClick={() => setDate(renderDate)}
                >
                  {d}
                </button>
              </div>
            );
        })}
      </div>
    </div>
  );
};
