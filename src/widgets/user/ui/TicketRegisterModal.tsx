import React, { useState } from 'react';

import { MODAL } from '@/shared/constants';
import { Button, Input, Modal } from '@/shared/ui';
import { useModal } from '@/shared/hook';

export default function TermOfServiceModal() {
  const { closeModal, modalState } = useModal();
  const [ticket, setTicket] = useState<string>('');
  const { isOpen } = modalState(MODAL.REGISTER_TICKET);
  const onClose = () => closeModal(MODAL.REGISTER_TICKET);

  return (
    <>
      {isOpen && (
        <Modal modalKey={MODAL.REGISTER_TICKET}>
          <p className='text-lg font-semibold'>티켓 등록하기</p>
          <Input
            placeholder='티켓 번호를 입력해주세요!'
            value={ticket}
            onChange={e => setTicket(e.target.value)}
          />
          <div className='mt-2 flex gap-3'>
            <Button
              halfWidth
              name='deleteWithdraw'
              label='취소'
              className='bg-sub hover:bg-border text-dark m-0'
              size='md'
              onClick={onClose}
            />
            <Button
              halfWidth
              name='deleteConfirm'
              label='등록하기'
              className='m-0'
              size='md'
            />
          </div>
        </Modal>
      )}
    </>
  );
}
