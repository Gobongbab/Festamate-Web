import React from 'react';

import { fetchLoginStatus } from '@festamate/utils';

import { useFlow } from '@/app/stackflow';

import { BottomSheet, Button } from '@/shared/ui';
import { BOTTOM_SHEET, MODAL, PATH } from '@/shared/constants';
import { useBottomSheet, useModal } from '@/shared/hook';
import type { RoomAuthority, RoomListItem, RoomStatus } from '@/shared/types';

interface MenuBottomSheetProps {
  roomAuthority: RoomAuthority | null;
  roomStatus: RoomStatus;
  roomData: RoomListItem;
}

export default function MenuBottomSheet({
  roomAuthority,
  roomStatus,
  roomData,
}: MenuBottomSheetProps) {
  const { closeBottomSheet, bottomSheetState } = useBottomSheet();
  const { openModal } = useModal();
  const { push } = useFlow();
  const { isOpen } = bottomSheetState(BOTTOM_SHEET.MENU);

  const handleEdit = () => {
    closeBottomSheet(BOTTOM_SHEET.MENU);
    push(PATH.EDIT, { initialData: roomData });
  };

  const handleDelete = () => {
    closeBottomSheet(BOTTOM_SHEET.MENU);
    if (roomStatus === 'MATCHING') openModal(MODAL.ROOM_DELETE);
    else openModal(MODAL.ROOM_DELETE_DENIAL);
  };

  const handleReport = () => {
    closeBottomSheet(BOTTOM_SHEET.MENU);
    if (fetchLoginStatus()) openModal(MODAL.ROOM_REPORT);
  };

  const renderMenu = (roomAuthority: RoomAuthority) => {
    if (roomAuthority === 'HOST') {
      return (
        <>
          <button
            name='roomEdit'
            className='w-full cursor-pointer py-1'
            onClick={handleEdit}
          >
            모임 수정
          </button>
          <button
            name='roomDelete'
            className='text-important w-full cursor-pointer py-1'
            onClick={handleDelete}
          >
            모임 삭제
          </button>
        </>
      );
    }

    return (
      <>
        <button
          name='roomReport'
          className='text-important w-full cursor-pointer py-1'
          onClick={handleReport}
        >
          모임 신고
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
