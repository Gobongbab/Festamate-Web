import { useStack } from '@stackflow/react';

import { PATH } from '@/shared/constants';
import { PathItem } from '@/shared/types';
import { DOCK_VISIBLE_PATHS } from '../constants/dockItems';

export const useDockState = () => {
  const stack = useStack();
  const info = stack.activities;

  const currentPath = info
    .filter(i => i.transitionState === 'enter-done')
    .map(i => i.name)
    .pop() as PathItem;

  const isDockVisible = DOCK_VISIBLE_PATHS.includes(
    currentPath as (typeof DOCK_VISIBLE_PATHS)[number],
  );

  return {
    currentPath,
    isDockVisible,
  };
};
