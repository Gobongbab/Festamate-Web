import React from 'react';

import { fetchLoginStatus } from '@festamate/utils';

import { BottomSheet, Button } from '@/shared/ui';
import { BOTTOM_SHEET, MODAL } from '@/shared/constants';
import { useBottomSheet, useModal } from '@/shared/hook';

export default function UserManageBottomSheet() {
  const { closeBottomSheet, bottomSheetState } = useBottomSheet();
  const { openModal } = useModal();
  const { isOpen } = bottomSheetState(BOTTOM_SHEET.USER_MENU);

  const handleReport = () => {
    closeBottomSheet(BOTTOM_SHEET.USER_MENU);
    if (fetchLoginStatus()) openModal(MODAL.USER_REPORT);
  };

  return (
    <>
      {isOpen && (
        <BottomSheet sheetKey={BOTTOM_SHEET.USER_MENU}>
          <div className='flex flex-col gap-3'>
            <button
              name='roomDelete'
              className='text-important w-full cursor-pointer py-1'
              onClick={handleReport}
            >
              유저 신고
            </button>
          </div>
          <Button
            size='md'
            className='text-dark bg-sub hover:bg-border mt-6 h-fit py-3 font-medium'
            onClick={() => closeBottomSheet(BOTTOM_SHEET.USER_MENU)}
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
