import React from 'react';

import { MODAL } from '@/shared/constants';
import { Button, Modal } from '@/shared/ui';
import { useModal } from '@/shared/hook';

export default function RoomJoinModal() {
  const { closeModal, modalState } = useModal();
  const { isOpen } = modalState(MODAL.JOIN);
  const onClose = () => closeModal(MODAL.JOIN);

  return (
    <>
      {isOpen && (
        <Modal modalKey={MODAL.JOIN}>
          <p className='text-lg font-semibold'>모임방 참여하기</p>
          <p>티켓 한 장을 소모하고 모임방에 참여할까요?</p>
          <div className='mt-2 flex gap-3'>
            <Button
              halfWidth
              noMargins
              name='joinWithdraw'
              label='더 생각해 볼래요'
              className='bg-border text-dark m-0'
              size='md'
              onClick={onClose}
            />
            <Button
              halfWidth
              noMargins
              name='joinConfirm'
              label='참여할래요'
              className='m-0'
              size='md'
            />
          </div>
        </Modal>
      )}
    </>
  );
}
