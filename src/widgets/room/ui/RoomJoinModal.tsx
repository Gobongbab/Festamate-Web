import React from 'react';

import { MODAL } from '@/shared/constants';
import { Button, Modal } from '@/shared/ui';
import { useModal } from '@/shared/hook';

export default function RoomJoinModal() {
  const { isOpen } = useModal().modalState(MODAL.JOIN);

  return (
    <>
      {isOpen && (
        <Modal modalKey={MODAL.JOIN}>
          <p className='text-lg font-semibold'>모임방 가입하기</p>
          <p>티켓 한 장을 소모하고 모임방에 가입할까요?</p>
          <div className='mt-2 flex gap-3'>
            <Button
              halfWidth
              noMargins
              label='더 생각해 볼래요'
              className='bg-border text-dark m-0'
              size='lg'
            />
            <Button
              halfWidth
              noMargins
              label='가입할래요'
              className='m-0'
              size='lg'
            />
          </div>
        </Modal>
      )}
    </>
  );
}
