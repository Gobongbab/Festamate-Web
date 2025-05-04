import { Gender, User } from '@/shared/types';

export type RoomStatus = 'MATCHING' | 'MATCHED' | 'CLOSED';

export type RoomAuthority =
  | 'HOST'
  | 'PARTICIPANT'
  | 'NON_PARTICIPANT'
  | 'NON_MEMBER';

export type Room = Partial<FormData> &
  Partial<FriendPhoneNumbers> & {
    id: number;
    maxParticipants: 2 | 4 | 6;
    status: RoomStatus;
    preferredGender: Gender;
    preferredStudentIdMin: string;
    preferredStudentIdMax: string;
    meetingDateTime: string;
    title: string;
    content: string;
    place: string;
  };

export type FriendPhoneNumbers = {
  friendPhoneNumbers: {
    friendPhoneNumbers: string[];
  };
};

export type RoomDetail = RoomListItem & {
  roomAuthority: RoomAuthority;
  hostParticipants: RoomParticipant[];
  guestParticipants: RoomParticipant[];
};

export type RoomParticipant = Pick<
  User,
  'nickname' | 'department' | 'gender' | 'studentId'
> & {
  id: number;
  isHost: boolean;
  profileImageUrl: string;
};

export type RoomListItem = Room & {
  currentParticipants: number;
  thumbnail: {
    name: string;
    url: string;
  };
};
