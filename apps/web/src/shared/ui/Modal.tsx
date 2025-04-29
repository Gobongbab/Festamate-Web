import React, { useRef, type ReactNode } from 'react';

import { ModalItem } from '@/shared/types';
import { useModal, useOutsideClick } from '@/shared/hook';
import { cn } from '@festamate/utils';

interface ModalProps {
  children: ReactNode;
  modalKey: ModalItem;
  className?: string;
}

export default function Modal({ children, modalKey, className }: ModalProps) {
  const { closeModal } = useModal();
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => closeModal(modalKey));

  return (
    <div className='pointer-events-auto absolute inset-0 z-300 grid size-full place-items-center bg-black/20'>
      <div
        className={cn(
          'rounded-10 z-400 flex w-[80%] max-w-[350px] flex-col gap-2 bg-white p-6',
          className,
        )}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
