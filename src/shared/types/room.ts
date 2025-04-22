import { Gender } from '@/shared/types';

export type Room = Partial<FormData> & {
  id: number;
  maxParticipants: 2 | 4 | 6;
  status: string;
  preferredGender: Gender;
  preferredStudentIdMin: string;
  preferredStudentIdMax: string;
  meetingDateTime: string;
  title: string;
  content: string;
  place: string;
};

export type RoomAuthority =
  | 'HOST'
  | 'PARTICIPANT'
  | 'NON_PARTICIPANT'
  | 'NON_MEMBER';

export type RoomDetail = RoomListItem & {
  roomAuthority: RoomAuthority;
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

export type RoomListItem = Room & {
  currentParticipants: number;
  thumbnail: {
    name: string;
    url: string;
  };
};
