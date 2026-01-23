import React from 'react';

import { MODAL } from '@/shared/constants';
import { Button, Modal } from '@/shared/ui';
import { useModal } from '@/shared/hook';

export default function TicketInfoModal() {
  const { closeModal, modalState } = useModal();
  const { isOpen } = modalState(MODAL.TICKET_INFO);
  const onClose = () => closeModal(MODAL.TICKET_INFO);

  return (
    <>
      {isOpen && (
        <Modal modalKey={MODAL.TICKET_INFO}>
          <>
            <p className='text-lg font-semibold'>티켓이란?</p>
            <div className='flex flex-col gap-2'>
              <p>티켓은 모임을 만들거나 참여할 때 사용되는 재화에요.</p>
              <p>하루에 기본 2개가 제공되며, 매일 자정이 되면 다시 채워져요.</p>
              <p>
                부족한 티켓은 8강의동 앞 40번 부스에 방문해서 추가로 구매할 수
                있어요.
              </p>
            </div>
            <div className='mt-2 flex gap-3'>
              <Button
                name='deleteWithdraw'
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
