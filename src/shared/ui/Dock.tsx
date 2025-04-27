import React from 'react';
import { useStack } from '@stackflow/react';

import { useFlow } from '@/app/stackflow';

import { BOTTOM_SHEET, DOCK, DOCK_ITEMS, PATH } from '@/shared/constants';
import { DockItem, PathItem } from '@/shared/types';
import { cn, fetchLoginStatus } from '@/shared/utils';
import { useBottomSheet } from '@/shared/hook';

interface DockProps {
  isLoading?: boolean;
}

interface DockButtonProps {
  item: DockItem;
  selected: boolean;
}

export default function Dock(isLoading: DockProps) {
  const stack = useStack();
  const info = stack.activities;
  const current = info
    .filter(i => i.transitionState === 'enter-done')
    .map(i => i.name)
    .pop() as PathItem;
  const render =
    current === PATH.HOME ||
    current === PATH.USER ||
    current === PATH.CHAT_LIST;

  return (
    <>
      {render && (
        <div
          className={cn(
            'dock box-shadow-dock container-mobile h-dock-height p-normal-spacing fixed right-0 bottom-0 left-0 z-60 flex items-center justify-between border-none pb-10',
            isLoading ? 'translate-y-0' : 'translate-y-full',
          )}
        >
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
  const { openBottomSheet } = useBottomSheet();
  const isLogin = fetchLoginStatus();

  const onClick = () => {
    if (item !== PATH.HOME && !isLogin) openBottomSheet(BOTTOM_SHEET.LOGIN);
    else replace(item, { animate: false }, { animate: false });
  };

  return (
    <div className='size-20' onClick={onClick}>
      {selected ? DOCK[item].selectedIcon : DOCK[item].icon}
    </div>
  );
};
