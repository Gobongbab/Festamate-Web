import React, { useEffect, useState } from 'react';

import { MODAL } from '@/shared/constants';
import { Button, Input, Modal } from '@/shared/ui';
import { useModal } from '@/shared/hook';
import { useSubmitTicket } from '@/widgets/user/api';
import { useFetchUserInfo } from '@/shared/api';

export default function TermOfServiceModal() {
  const { closeModal, modalState } = useModal();
  const { refetch } = useFetchUserInfo();

  const { mutate } = useSubmitTicket();
  const { isOpen } = modalState(MODAL.REGISTER_TICKET);

  const [ticket, setTicket] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onClose = () => closeModal(MODAL.REGISTER_TICKET);

  const onSubmit = () => {
    mutate(ticket, {
      onSuccess: () => {
        refetch();
        closeModal(MODAL.REGISTER_TICKET);
      },
      onError: error => setError(error.message || '등록되지 않은 쿠폰이에요'),
    });
  };

  useEffect(() => {
    setError(null);
    setTicket('');
  }, [isOpen]);

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
          {error && <p className='text-important text-sm'>{error}</p>}
          <div className='mt-2 flex gap-3'>
            <Button
              halfWidth
              name='deleteWithdraw'
              label='취소'
              className='bg-sub hover:bg-border text-dark'
              size='md'
              onClick={onClose}
            />
            <Button
              halfWidth
              name='deleteConfirm'
              label='등록하기'
              size='md'
              disabled={ticket.length < 1}
              onClick={onSubmit}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
