import React, { Dispatch, SetStateAction, useCallback } from 'react';

import { BottomSheet, Button } from '@/shared/ui';
import { BOTTOM_SHEET } from '@/shared/constants';
import { useBottomSheet } from '@/shared/hook';

import { useFilterContent } from '@/screen/search/model';
import { Filter } from '@/screen/search/types';

interface SearchFilterProps {
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export default function SearchFilter({ setFilter }: SearchFilterProps) {
  const { closeBottomSheet, bottomSheetState } = useBottomSheet();
  const { isOpen: status } = bottomSheetState(BOTTOM_SHEET.FILTER_STATUS);
  const { isOpen: gender } = bottomSheetState(BOTTOM_SHEET.FILTER_GENDER);
  const { isOpen: participants } = bottomSheetState(
    BOTTOM_SHEET.FILTER_PARTICIPANTS,
  );

  const isOpen = status || gender || participants;
  const sheetKey = status
    ? BOTTOM_SHEET.FILTER_STATUS
    : gender
      ? BOTTOM_SHEET.FILTER_GENDER
      : participants
        ? BOTTOM_SHEET.FILTER_PARTICIPANTS
        : BOTTOM_SHEET.FILTER_STATUS;

  const { content, selectedStatus, selectedGender, selectedParticipants } =
    useFilterContent(sheetKey);
  const { title, content: filterContent } = content;

  const handleClick = useCallback(async () => {
    const result = {
      status: selectedStatus,
      gender: selectedGender,
      participants: selectedParticipants,
    };

    const filterChanged = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(result).filter(([_, value]) => value !== undefined),
    );

    setFilter({ ...filterChanged });

    closeBottomSheet(sheetKey);
  }, [
    selectedStatus,
    selectedGender,
    selectedParticipants,
    setFilter,
    closeBottomSheet,
    sheetKey,
  ]);

  if (!isOpen) return null;

  return (
    <BottomSheet sheetKey={sheetKey}>
      <div className='flex items-baseline justify-between'>
        <span className='text-xl font-semibold'>{title}</span>
        <button
          className='text-md focus:outline-none'
          name='close-bottom-sheet'
          onClick={() => closeBottomSheet(sheetKey)}
        >
          닫기
        </button>
      </div>
      <div className='my-6'>{filterContent}</div>
      <Button
        onClick={handleClick}
        size='lg'
        className='font-medium'
        label='필터 적용하기'
        shadow={false}
      />
    </BottomSheet>
  );
}
