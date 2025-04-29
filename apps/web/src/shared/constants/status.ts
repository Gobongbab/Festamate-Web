import { RoomStatus } from '@/shared/types';

export const ROOM_STATUS: Record<RoomStatus, string> = {
  MATCHING: '매칭중',
  MATCHED: '매칭 완료',
  CLOSED: '모임 종료',
};
