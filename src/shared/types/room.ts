export type Room = {
  id: number;
  headCount: 2 | 4 | 6;
  preferredGender: 'MALE' | 'FEMALE';
  meetingDateTime: string;
  title: string;
  content: string;
};

export type RoomDetail = Room & {
  participants: RoomParticipant[];
};

export type RoomParticipant = {
  id: number;
  nickname: string;
  studentId: string;
  gender: 'MALE' | 'FEMALE';
  department: string;
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
