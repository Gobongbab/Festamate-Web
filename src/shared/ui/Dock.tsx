import React from 'react';
import { useStack } from '@stackflow/react';
import { useSetAtom } from 'jotai';

import { useFlow } from '@/app/stackflow';

import { DOCK, DOCK_ITEMS, PATH } from '@/shared/constants';
import { DockItem, PathItem } from '@/shared/types';
import { fetchLoginStatus } from '@/shared/utils';
import { bottomSheetAtom } from '@/shared/atom';

interface DockButtonProps {
  item: DockItem;
  selected: boolean;
}

export default function Dock() {
  const stack = useStack();
  const info = stack.activities;
  const current = info
    .filter(i => i.transitionState === 'enter-done')
    .map(i => i.name)
    .pop() as PathItem;
  const render = current === PATH.HOME || current === PATH.USER;

  return (
    <>
      {render && (
        <div className='dock box-shadow-dock container-mobile h-dock-height p-normal-spacing fixed right-0 bottom-0 left-0 z-60 flex items-center justify-between border-none'>
          {DOCK_ITEMS.map(item => (
            <DockButton key={item} item={item} selected={current === item} />
          ))}
        </div>
      )}
    </>
  );
}

const DockButton = ({ item, selected }: DockButtonProps) => {
  const { replace } = useFlow();
  const isLogin = fetchLoginStatus();
  const setIsOpen = useSetAtom(bottomSheetAtom);

  const onClick = () => {
    if (item === PATH.USER && !isLogin) setIsOpen(true);
    else replace(item, { animate: false }, { animate: false });
  };

  return (
    <div className='size-20' onClick={onClick}>
      {selected ? DOCK[item].selectedIcon : DOCK[item].icon}
    </div>
  );
};
