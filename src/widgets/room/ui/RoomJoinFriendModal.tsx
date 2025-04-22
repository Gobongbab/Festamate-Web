import React from 'react';

import { MODAL } from '@/shared/constants';
import { Button, Modal } from '@/shared/ui';
import { useModal } from '@/shared/hook';

export default function RoomJoinModal() {
  const { isOpen } = useModal().modalState(MODAL.JOIN_WITH_FRIEND);

  return (
    <>
      {isOpen && (
        <Modal modalKey={MODAL.JOIN_WITH_FRIEND}>
          <p className='text-lg font-semibold'>친구와 함께 참여하기</p>
          <p>함께할 친구를 불러주세요!</p>
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
