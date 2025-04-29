import React, { type ReactNode } from 'react';

import { cn } from '@festamate/utils';
import { BottomSheetItem } from '../types';
import { useBottomSheet } from '../hook';

interface BottomSheetProps {
  children: ReactNode;
  sheetKey: BottomSheetItem;
}

export default function BottomSheet({ children, sheetKey }: BottomSheetProps) {
  const { closeBottomSheet, bottomSheetState } = useBottomSheet();
  const { isVisible } = bottomSheetState(sheetKey);
  const onClose = () => closeBottomSheet(sheetKey);

  return (
    <>
      <div
        className={cn('overlay', isVisible && 'overlay-visible')}
        onClick={onClose}
      />
      <div
        className={cn(
          'rounded-t-10 fixed bottom-0 left-0 z-400 flex h-60 h-fit w-full flex-col bg-white p-6 pt-8 pb-18 shadow-lg transition-transform duration-300',
          isVisible ? 'translate-y-0' : 'translate-y-full',
          isVisible ? 'box-shadow-bottom-sheet block' : '',
        )}
      >
        {children}
      </div>
    </>
  );
}
