import React from 'react';

import { cn } from '@festamate/utils';
import { useDockState } from '../model/useDockState';
import { DOCK_ITEMS } from '../constants/dockItems';
import DockButton from './DockButton';

interface DockProps {
  isLoading?: boolean;
}

export default function Dock({ isLoading = false }: DockProps) {
  const { currentPath, isDockVisible } = useDockState();

  return (
    <>
      {isDockVisible && (
        <div
          className={cn(
            'dock box-shadow-dock container-mobile h-dock-height p-normal-spacing fixed right-0 bottom-0 left-0 z-60 flex items-center justify-between border-none pb-10',
            !isLoading ? 'translate-y-0' : 'translate-y-full',
          )}
        >
          {DOCK_ITEMS.map(item => (
            <DockButton key={item} item={item} selected={currentPath === item} />
          ))}
        </div>
      )}
    </>
  );
}
