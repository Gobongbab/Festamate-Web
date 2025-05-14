import React, { useState } from 'react';

import { BottomSheet, Button } from '@/shared/ui';
import { useBottomSheet } from '@/shared/hook';
import { BOTTOM_SHEET } from '@/shared/constants';
import { useRoomCreateContext } from '../model';
import { cn, getDate } from '@festamate/utils';

export default function TimePickBottomSheet() {
  const { closeBottomSheet, bottomSheetState } = useBottomSheet();
  const { isOpen } = bottomSheetState(BOTTOM_SHEET.TIME_PICKER);
  const { date: contextDate, setDate } = useRoomCreateContext();
  const date = contextDate ?? new Date();

  const [isAM, setIsAM] = useState(Number(getDate(date, 'HH')) < 12);
  const [selectedHour, setSelectedHour] = useState(
    Number(getDate(date, 'HH')) % 12 || 12,
  );
  const [selectedMinute, setSelectedMinute] = useState(
    Number(getDate(date, 'mm')),
  );

  const handleClick = async () => {
    const hour = isAM ? selectedHour : selectedHour + 12;
    const newDate = new Date(date);
    newDate.setHours(hour, selectedMinute);
    setDate(newDate);
    closeBottomSheet(BOTTOM_SHEET.TIME_PICKER);
  };

  const handleAMPMClick = (isAMSelected: boolean) => {
    setIsAM(isAMSelected);
  };

  const handleHourChange = (hour: number) => {
    setSelectedHour(hour);
  };

  const handleMinuteChange = (minute: number) => {
    setSelectedMinute(minute);
  };

  return (
    <>
      {isOpen && (
        <BottomSheet sheetKey={BOTTOM_SHEET.TIME_PICKER}>
          <div className='flex items-baseline justify-between'>
            <span className='text-xl font-semibold'>시간을 선택해 주세요!</span>
            <button
              className='text-md focus:outline-none'
              name='close-bottom-sheet'
              onClick={() => closeBottomSheet(BOTTOM_SHEET.TIME_PICKER)}
            >
              닫기
            </button>
          </div>
          <div className='my-6 grid w-full grid-cols-3 gap-3'>
            <div className='flex items-center justify-center gap-2'>
              <button
                className={cn(
                  'border-border rounded-10 border-[1px] px-3 py-2',
                  isAM && 'bg-point text-white',
                )}
                onClick={() => handleAMPMClick(true)}
              >
                오전
              </button>
              <button
                className={cn(
                  'border-border rounded-10 border-[1px] px-3 py-2',
                  !isAM && 'bg-point text-white',
                )}
                onClick={() => handleAMPMClick(false)}
              >
                오후
              </button>
            </div>
            <div className='w-full'>
              <select
                className='border-border w-full rounded-lg border-[1px] p-2 focus:outline-none'
                value={selectedHour}
                onChange={e => handleHourChange(Number(e.target.value))}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                  <option key={hour} value={hour}>
                    {hour}시
                  </option>
                ))}
              </select>
            </div>
            <div className='w-full'>
              <select
                className='border-border w-full rounded-lg border-[1px] p-2 focus:outline-none'
                value={selectedMinute}
                onChange={e => handleMinuteChange(Number(e.target.value))}
              >
                {Array.from({ length: 60 }, (_, i) => i).map(minute => (
                  <option key={minute} value={minute}>
                    {minute}분
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button
            onClick={handleClick}
            size='lg'
            className='h-fit font-medium'
            label='시간 선택하기'
            shadow={false}
          />
        </BottomSheet>
      )}
    </>
  );
}
