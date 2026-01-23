import { Gender, RoomStatus } from '@/shared/types';

export type Filter = {
  status?: RoomStatus;
  gender?: Gender;
  minStudentId?: string;
  maxStudentId?: string;
  participants?: 2 | 4 | 6;
};
