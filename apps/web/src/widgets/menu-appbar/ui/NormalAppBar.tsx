import { APPBAR_BASE_STYLE } from '../constants/styles';

export const NormalAppBar = (title?: string) => ({
  title: title,
  ...APPBAR_BASE_STYLE,
});
