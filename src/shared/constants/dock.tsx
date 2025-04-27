import {
  RiHome9Fill,
  RiHome9Line,
  RiUser3Fill,
  RiUser3Line,
} from 'react-icons/ri';
import {
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipsesSharp,
} from 'react-icons/io5';

import { DockItem } from '../types/dock';
import { PATH } from './path';

export const DOCK = {
  [PATH.HOME]: {
    title: '홈',
    icon: <RiHome9Line size={20} />,
    selectedIcon: <RiHome9Fill size={20} />,
  },
  [PATH.CHAT]: {
    title: '채팅',
    icon: <IoChatbubbleEllipsesOutline size={20} />,
    selectedIcon: <IoChatbubbleEllipsesSharp size={20} />,
  },
  [PATH.USER]: {
    title: '프로필',
    icon: <RiUser3Line size={20} />,
    selectedIcon: <RiUser3Fill size={20} />,
  },
};

export const DOCK_ITEMS = Object.keys(DOCK) as Array<DockItem>;
