import { Gender, Status } from '@/shared/types';

export type User = {
  name: string;
  nickname: string;
  studentId: string;
  phoneNumber: string;
  gender: Gender;
  status: Status;
  department: string;
  maximumTicket: number;
  remainingTicket: number;
  profileImage: {
    name: string;
    url: string;
  };
};
