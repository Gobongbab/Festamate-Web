import { useAtomValue, useSetAtom } from 'jotai';

import { bottomSheetAtom, updateBottomSheet } from '../atom';
import { BottomSheetItem } from '../types';

export default function useBottomSheet() {
  const bottomSheet = useAtomValue(bottomSheetAtom);
  const setBottomSheet = useSetAtom(updateBottomSheet);

  const bottomSheetState = (key: BottomSheetItem) =>
    bottomSheet[key] || { isOpen: false };
  const openBottomSheet = (key: BottomSheetItem) =>
    setBottomSheet({ key, isOpen: true });
  const closeBottomSheet = (key: BottomSheetItem) =>
    setBottomSheet({ key, isOpen: false });

  return { bottomSheetState, openBottomSheet, closeBottomSheet };
}
