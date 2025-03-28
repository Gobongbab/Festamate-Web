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
    <div className='dock box-shadow-dock container-mobile fixed right-0 bottom-0 left-0 z-60 flex h-18 items-center justify-between border-none p-7'>
      {DOCK_ITEMS.map(item => (
        <DockButton key={item} item={item} selected={current === item} />
      ))}
    </div>
  );
}

const DockButton = ({ item, selected }: DockButtonProps) => {
  const stack = useStack();
  const { replace, pop } = useFlow();

  const onClick = () => {
    replace(item, { animate: false }, { animate: false });
    const info = stack.activities;
    if (
      info.filter(activity => activity.transitionState === 'enter-done')
        .length > 0
    ) {
      pop();
    }
  };

  return (
    <div className='size-20' onClick={onClick}>
      {selected ? DOCK[item].selectedIcon : DOCK[item].icon}
    </div>
  );
};
