import { useContext } from 'react';
import { RoomCreateContext } from '@/widgets/create/model';

export default function useRoomCreateContext() {
  const context = useContext(RoomCreateContext);
  if (!context) {
    throw new Error(
      'useRoomCreateContext는 CreateProvider 안에서만 사용할 수 있어요.',
    );
  }
  return context;
}
