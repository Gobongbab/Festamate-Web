import React from 'react';

import { useFlow } from '@/app/stackflow';
import { useStack } from '@stackflow/react';
import { DOCK, DOCK_ITEMS } from '@/shared/constants';
import { DockItem } from '@/shared/types';

interface DockButtonProps {
  item: DockItem;
  selected: boolean;
}

export default function Dock() {
  const stack = useStack();
  const info = stack.activities;
  const current = info[info.length - 1].name as DockItem;

  return (
    <div className='dock box-shadow-dock container-mobile h-dock-height p-normal-spacing fixed right-0 bottom-0 left-0 z-60 flex items-center justify-between border-none'>
      {DOCK_ITEMS.map(item => (
        <DockButton key={item} item={item} selected={current === item} />
      ))}
    </div>
  );
}

const DockButton = ({ item, selected }: DockButtonProps) => {
  const { replace } = useFlow();
  const onClick = () => {
    replace(item, { animate: false }, { animate: false });
  };

  return (
    <div className='size-20' onClick={onClick}>
      {selected ? DOCK[item].selectedIcon : DOCK[item].icon}
    </div>
  );
};
