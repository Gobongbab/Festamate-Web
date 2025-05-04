export type RoomDetail = {
  id: number;
  headCount: number;
  preferredGender: 'MALE' | 'FEMALE';
  openChatLink: string;
  meetingDateTime: string;
  title: string;
  content: string;
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
