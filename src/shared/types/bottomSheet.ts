import { BOTTOM_SHEET } from '../constants';

export type BottomSheetItem = (typeof BOTTOM_SHEET)[keyof typeof BOTTOM_SHEET];
