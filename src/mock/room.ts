import { RoomParticipant } from '@/widgets/room/types';

export const ROOM_MAKERS: RoomParticipant[] = [
  {
    id: 1,
    nickname: '코딩천재',
    studentId: '201912134',
    gender: 'MALE',
    department: 'AI컴퓨터공학부',
    isHost: true,
  },
  {
    id: 2,
    nickname: '버그헌터',
    studentId: '201912134',
    gender: 'MALE',
    department: 'AI컴퓨터공학부',
    isHost: false,
  },
];

export const ROOM_PARTICIPANTS: RoomParticipant[] = [
  {
    id: 1,
    nickname: '소프트요정',
    studentId: '201912134',
    gender: 'FEMALE',
    department: '관광문화대학',
    isHost: true,
  },
  {
    id: 2,
    nickname: '버블티공주',
    studentId: '201912134',
    gender: 'FEMALE',
    department: '관광문화대학',
    isHost: false,
  },
];
