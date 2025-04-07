import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ko';

dayjs.extend(localizedFormat);
dayjs.locale('ko');

export const getDate = (date: Date | string, format: string) => {
  const target = dayjs(date).locale('ko');
  return target.format(format);
};
