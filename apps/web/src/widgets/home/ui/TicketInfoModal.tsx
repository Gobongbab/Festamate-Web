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
            <p className='text-lg font-semibold'>Festamate! 티켓이란?</p>
            <div className='flex flex-col gap-2'>
              <p>
                Festamate! 티켓은 모임을 개설하거나
                <br />
                참여할 때마다 하나씩 소모돼요.
              </p>
              <p>
                모임에 참여했더라도, 모임이 취소된 경우에는
                <br />
                티켓을 돌려받을 수 있어요.
              </p>
              <p>
                더 많은 티켓을 사용하고 싶다면,
                <br />
                Festamate! 부스로 찾아오세요!
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
