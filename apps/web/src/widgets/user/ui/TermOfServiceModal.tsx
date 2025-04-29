import React from 'react';

import { MODAL, TERMS } from '@/shared/constants';
import { Button, Modal } from '@/shared/ui';
import { useModal } from '@/shared/hook';

export default function TermOfServiceModal() {
  const { closeModal, modalState } = useModal();
  const { isOpen } = modalState(MODAL.TERM_OF_SERVICE);
  const onClose = () => closeModal(MODAL.TERM_OF_SERVICE);

  return (
    <>
      {isOpen && (
        <Modal
          modalKey={MODAL.TERM_OF_SERVICE}
          className='max-h-[70vh] overflow-y-hidden'
        >
          <p className='text-lg font-semibold'>Festamate! 이용 약관</p>
          <div className='scrollbar-hide overflow-y-auto'>
            <div className='flex flex-col gap-6'>
              {TERMS.map((term, index) => (
                <div key={index} className='flex flex-col gap-3'>
                  <p className='text-md font-semibold'>{term.title}</p>
                  <div className='flex flex-col gap-1.5'>
                    {term.content.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            label='닫기'
            onClick={onClose}
            className='bg-sub hover:bg-border text-dark mt-2'
            size='md'
          />
        </Modal>
      )}
    </>
  );
}
