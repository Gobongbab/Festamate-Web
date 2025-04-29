import React from 'react';

import { MODAL } from '@/shared/constants';
import { Button, Modal } from '@/shared/ui';
import { useModal } from '@/shared/hook';

import { useDeleteRoom } from '@/widgets/room/api';

interface RoomDeleteModalProps {
  roomId: number;
}

export default function RoomDeleteModal({ roomId }: RoomDeleteModalProps) {
  const { closeModal, modalState } = useModal();
  const { mutate, isError } = useDeleteRoom();
  const { isOpen } = modalState(MODAL.ROOM_DELETE);

  const onClose = () => closeModal(MODAL.ROOM_DELETE);
  const onJoin = () => mutate(roomId);

  return (
    <>
      {isOpen && (
        <Modal modalKey={MODAL.ROOM_DELETE}>
          {!isError ? (
            <>
              <p className='text-lg font-semibold'>모임 삭제</p>
              <p>정말 모임을 삭제할까요?</p>
              <div className='mt-2 flex gap-3'>
                <Button
                  halfWidth
                  noMargins
                  name='deleteWithdraw'
                  label='더 생각해 볼래요'
                  className='bg-sub hover:bg-border text-dark m-0'
                  size='md'
                  onClick={onClose}
                />
                <Button
                  halfWidth
                  noMargins
                  name='deleteConfirm'
                  label='삭제할게요'
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
