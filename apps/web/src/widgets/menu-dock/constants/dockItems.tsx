import {
  RiHome9Fill,
  RiHome9Line,
  RiMessage3Fill,
  RiMessage3Line,
  RiUser3Fill,
  RiUser3Line,
} from 'react-icons/ri';

import { PATH } from '@/shared/constants';

export const DOCK_CONFIG = {
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
  [PATH.CHAT_LIST]: {
    title: '채팅',
    icon: <RiMessage3Line size={20} />,
    selectedIcon: <RiMessage3Fill size={20} />,
  },
};

export const DOCK_ITEMS = Object.keys(DOCK_CONFIG) as Array<
  keyof typeof DOCK_CONFIG
>;

export const DOCK_VISIBLE_PATHS = [PATH.HOME, PATH.USER, PATH.CHAT_LIST];
