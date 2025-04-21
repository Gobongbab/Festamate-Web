import { atom } from 'jotai';

import type { BottomSheetItem } from '../types';
import { BOTTOM_SHEET } from '../constants';

type BottomSheetInfo = {
  [key in BottomSheetItem]: { isOpen: boolean };
};

const bottomSheet = Object.fromEntries(
  Object.keys(BOTTOM_SHEET).map(key => [key, { isOpen: false }]),
) as BottomSheetInfo;

export const bottomSheetAtom = atom<BottomSheetInfo>(bottomSheet);

export const updateBottomSheet = atom(
  null,
  (get, set, update: { key: BottomSheetItem; isOpen: boolean }) => {
    const currentBottomSheet = get(bottomSheetAtom);
    const updatedBottomSheet = {
      ...currentBottomSheet,
      [update.key]: { isOpen: update.isOpen },
    };
    set(bottomSheetAtom, updatedBottomSheet);
  },
);
