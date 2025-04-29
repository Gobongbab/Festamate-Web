import { Gender } from '@/shared/types';

export type User = {
  name: string;
  nickname: string;
  studentId: string;
  phoneNumber: string;
  gender: Gender;
  department: string;
  maximumTicket: number;
  remainingTicket: number;
  profileImage: {
    name: string;
    url: string;
  };
};
