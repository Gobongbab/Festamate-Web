export type RoomStatus = 'MATCHING' | 'MATCHED' | 'CLOSED';

export type Gender = 'MALE' | 'FEMALE';

export type Room = {
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

export type RoomListItem = Room & {
  currentParticipants: number;
  thumbnail: {
    name: string;
    url: string;
  };
};
