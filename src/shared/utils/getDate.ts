import dayjs from 'dayjs';

export const getDate = (date: Date | string, format: string) => {
  const target = dayjs(date);
  return target.format(format);
};
