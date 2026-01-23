import React from 'react';

import { MODAL } from '@/shared/constants';
import { Button, Modal } from '@/shared/ui';
import { useModal } from '@/shared/hook';

export default function RoomDeleteDenialModal() {
  const { closeModal, modalState } = useModal();
  const { isOpen } = modalState(MODAL.ROOM_DELETE_DENIAL);

  const onClose = () => closeModal(MODAL.ROOM_DELETE_DENIAL);

  return (
    <>
      {isOpen && (
        <Modal modalKey={MODAL.ROOM_DELETE_DENIAL}>
          <>
            <p className='text-lg font-semibold'>모임 삭제</p>
            <p>
              이미 매칭이 완료되거나, 미팅이 종료된 모임은 삭제할 수 없어요.
            </p>
            <div className='mt-2 flex gap-3'>
              <Button
                name='impossibleDelete'
                label='확인했어요'
                size='md'
                onClick={onClose}
              />
            </div>
          </>
        </Modal>
      )}
    </>
  );
}
