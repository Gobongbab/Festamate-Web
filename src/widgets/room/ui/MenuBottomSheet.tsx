import React from 'react';

import { BottomSheet, Button } from '@/shared/ui';
import { BOTTOM_SHEET } from '@/shared/constants';
import { useBottomSheet } from '@/shared/hook';

export default function MenuBottomSheet() {
  const { closeBottomSheet, bottomSheetState } = useBottomSheet();
  const { isOpen } = bottomSheetState(BOTTOM_SHEET.MENU);

  return (
    <>
      {isOpen && (
        <BottomSheet sheetKey={BOTTOM_SHEET.MENU}>
          <div className='flex flex-col gap-3'>
            <button className='w-full cursor-pointer py-1'>모임방 수정</button>
            <button className='text-important w-full cursor-pointer py-1'>
              모임방 신고
            </button>
          </div>
          <Button
            size='md'
            className='text-dark bg-sub hover:bg-border mt-6 h-fit py-3 font-medium'
            onClick={() => closeBottomSheet(BOTTOM_SHEET.MENU)}
            label={
              <div className='flex w-full items-center justify-center gap-x-4 py-1'>
                <span>닫기</span>
              </div>
            }
            shadow={false}
          />
        </BottomSheet>
      )}
    </>
  );
}
