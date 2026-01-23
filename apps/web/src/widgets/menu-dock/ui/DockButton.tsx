import React from 'react';

import { useFlow } from '@/app/stackflow';
import { useBottomSheet } from '@/shared/hook';
import { BOTTOM_SHEET, PATH } from '@/shared/constants';
import { fetchLoginStatus } from '@festamate/utils';
import { DOCK_CONFIG } from '../constants/dockItems';
import { DockItem } from '../types';

interface DockButtonProps {
  item: DockItem;
  selected: boolean;
}

export default function DockButton({ item, selected }: DockButtonProps) {
  const { replace } = useFlow();
  const { openBottomSheet } = useBottomSheet();
  const isLogin = fetchLoginStatus();

  const onClick = () => {
    if (item !== PATH.HOME && !isLogin) {
      openBottomSheet(BOTTOM_SHEET.LOGIN);
    } else {
      replace(item, { animate: false }, { animate: false });
    }
  };

  return (
    <div className='size-20' onClick={onClick}>
      {selected ? DOCK_CONFIG[item].selectedIcon : DOCK_CONFIG[item].icon}
    </div>
  );
}
