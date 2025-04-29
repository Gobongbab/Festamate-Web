import { useAtomValue, useSetAtom } from 'jotai';

import { bottomSheetAtom, updateBottomSheet } from '../atom';
import { BottomSheetItem } from '../types';

export default function useBottomSheet() {
  const bottomSheet = useAtomValue(bottomSheetAtom);
  const setBottomSheet = useSetAtom(updateBottomSheet);

  const bottomSheetState = (key: BottomSheetItem) =>
    bottomSheet[key] || { isOpen: false };
  const openBottomSheet = (key: BottomSheetItem) => {
    setBottomSheet({ key, isOpen: true, isVisible: false });
    setTimeout(
      () => setBottomSheet({ key, isOpen: true, isVisible: true }),
      100,
    );
  };
  const closeBottomSheet = (key: BottomSheetItem) => {
    setBottomSheet({ key, isOpen: true, isVisible: false });
    setTimeout(
      () => setBottomSheet({ key, isOpen: false, isVisible: false }),
      300,
    );
  };

  return {
    bottomSheetState,
    openBottomSheet,
    closeBottomSheet,
  };
}
