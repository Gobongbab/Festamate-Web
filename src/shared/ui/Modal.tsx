import React, { useRef, type ReactNode } from 'react';

import { ModalItem } from '@/shared/types';
import { useModal, useOutsideClick } from '@/shared/hook';

interface ModalProps {
  children: ReactNode;
  modalKey: ModalItem;
}

export default function Modal({ children, modalKey }: ModalProps) {
  const { closeModal } = useModal();
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => closeModal(modalKey));

  return (
    <div className='absolute inset-0 z-300 grid size-full place-items-center bg-black/20'>
      <div
        className='rounded-10 z-400 flex w-[80%] max-w-[350px] flex-col gap-2 bg-white p-6'
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
