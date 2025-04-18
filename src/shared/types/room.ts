import { Gender } from '@/shared/types';

export type Room = {
  id: number;
  headCount: 2 | 4 | 6;
  status: string;
  preferredGender: Gender;
  preferredStudentIdMin: string;
  preferredStudentIdMax: string;
  meetingDateTime: string;
  title: string;
  content: string;
  place: string;
};

export type RoomDetail = Room & {
  hostParticipants: RoomParticipant[];
  guestParticipants: RoomParticipant[];
};

export type RoomParticipant = {
  id: number;
  nickname: string;
  studentId: string;
  gender: Gender;
  major: string;
  isHost: boolean;
};

export type RoomListItem = Omit<Room, 'headCount'> & {
  maxParticipants: number;
  currentParticipants: number;
  thumbnail: {
    name: string;
    url: string;
  };
};
