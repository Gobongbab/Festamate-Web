import React from 'react';

import { MODAL } from '@/shared/constants';
import { Modal } from '@/shared/ui';
import { useModal } from '@/shared/hook';
import { useAtomValue } from 'jotai';
import { errorMessageAtom } from '../atom';

export default function ErrorModal() {
  const { modalState } = useModal();
  const message = useAtomValue(errorMessageAtom);
  const { isOpen } = modalState(MODAL.ERROR);

  return (
    <>
      {isOpen && (
        <Modal modalKey={MODAL.ERROR}>
          <p className='text-lg font-semibold'>에러가 발생했어요</p>
          <div className='grid h-10 place-items-center'>
            <div className='flex flex-col gap-2'>{message}</div>
          </div>
        </Modal>
      )}
    </>
  );
}
