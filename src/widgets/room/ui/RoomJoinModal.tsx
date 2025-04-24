import React from 'react';

import { MODAL } from '@/shared/constants';
import { Button, Modal } from '@/shared/ui';
import { useModal } from '@/shared/hook';

import { useSubmitRoomJoin } from '@/widgets/room/api';

interface RoomJoinModalProps {
  roomId: number;
}

export default function RoomJoinModal({ roomId }: RoomJoinModalProps) {
  const { closeModal, modalState } = useModal();
  const { mutate, isError } = useSubmitRoomJoin(roomId);
  const { isOpen } = modalState(MODAL.JOIN);

  const onClose = () => closeModal(MODAL.JOIN);
  const onJoin = () => mutate(roomId);

  return (
    <>
      {isOpen && (
        <Modal modalKey={MODAL.JOIN}>
          {!isError ? (
            <>
              <p className='text-lg font-semibold'>모임방 참여하기</p>
              <p>티켓 한 장을 소모하고 모임방에 참여할까요?</p>
              <div className='mt-2 flex gap-3'>
                <Button
                  halfWidth
                  noMargins
                  name='joinWithdraw'
                  label='더 생각해 볼래요'
                  className='bg-sub hover:bg-border text-dark m-0'
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
                  onClick={onJoin}
                />
              </div>
            </>
          ) : (
            <div className='grid h-10 place-items-center'>
              <div className='flex flex-col gap-2'>참여에 실패했어요</div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
