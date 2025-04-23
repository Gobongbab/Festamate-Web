import React from 'react';

import { BottomSheet, Button } from '@/shared/ui';
import { BOTTOM_SHEET, MODAL } from '@/shared/constants';
import { useBottomSheet, useModal } from '@/shared/hook';
import { RoomAuthority } from '@/shared/types';

interface MenuBottomSheetProps {
  roomAuthority: RoomAuthority | null;
}

export default function MenuBottomSheet({
  roomAuthority,
}: MenuBottomSheetProps) {
  const { closeBottomSheet, bottomSheetState } = useBottomSheet();
  const { openModal } = useModal();
  const { isOpen } = bottomSheetState(BOTTOM_SHEET.MENU);

  const handleDelete = () => {
    closeBottomSheet(BOTTOM_SHEET.MENU);
    openModal(MODAL.ROOM_DELETE);
  };

  const renderMenu = (roomAuthority: RoomAuthority) => {
    if (roomAuthority === 'HOST') {
      return (
        <>
          <button className='w-full cursor-pointer py-1'>모임방 수정</button>
          <button
            name='roomDelete'
            className='text-important w-full cursor-pointer py-1'
            onClick={handleDelete}
          >
            모임방 삭제
          </button>
        </>
      );
    }

    return (
      <>
        <button className='text-important w-full cursor-pointer py-1'>
          모임방 신고
        </button>
      </>
    );
  };

  return (
    <>
      {isOpen && (
        <BottomSheet sheetKey={BOTTOM_SHEET.MENU}>
          <div className='flex flex-col gap-3'>
            {roomAuthority && renderMenu(roomAuthority)}
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
