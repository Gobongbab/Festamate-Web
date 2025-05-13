import {
  RiHome9Fill,
  RiHome9Line,
  RiUser3Fill,
  RiUser3Line,
} from 'react-icons/ri';

import { DockItem } from '../types/dock';
import { PATH } from './path';

export const DOCK = {
  [PATH.HOME]: {
    title: '홈',
    icon: <RiHome9Line size={20} />,
    selectedIcon: <RiHome9Fill size={20} />,
  },
  [PATH.USER]: {
    title: '프로필',
    icon: <RiUser3Line size={20} />,
    selectedIcon: <RiUser3Fill size={20} />,
  },
};

export const DOCK_ITEMS = Object.keys(DOCK) as Array<DockItem>;
