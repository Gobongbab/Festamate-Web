import React, { useState, useEffect, ReactNode } from 'react';

import { cn } from '@/shared/utils';
import { BottomSheetItem } from '../types';
import { useBottomSheet } from '../hook';

interface BottomSheetProps {
  children: ReactNode;
  sheetKey: BottomSheetItem;
}

export default function BottomSheet({ children, sheetKey }: BottomSheetProps) {
  const [visible, setVisible] = useState(false);
  const { closeBottomSheet, bottomSheetState } = useBottomSheet();
  const { isOpen } = bottomSheetState(sheetKey);

  const onClose = () => {
    closeBottomSheet(sheetKey);
    setVisible(false);
  };

  useEffect(() => {
    if (isOpen) setVisible(true);
    else {
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={cn('overlay', visible && 'overlay-visible')}
        onClick={onClose}
      />
      <div
        className={cn(
          'rounded-t-10 fixed bottom-0 left-0 z-400 flex h-60 h-fit w-full flex-col bg-white p-6 pt-8 pb-18 shadow-lg transition-transform duration-300',
          isOpen ? 'translate-y-0' : 'translate-y-full',
          visible ? 'box-shadow-bottom-sheet block' : 'none',
        )}
      >
        {children}
      </div>
    </>
  );
}
