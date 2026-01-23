import { useFormContext } from 'react-hook-form';
import { EditFormData } from '@/widgets/edit/model';

export default function useRoomEditContext() {
  const context = useFormContext<EditFormData>();

  if (!context) {
    throw new Error(
      'useRoomEditContext는 EditProvider 안에서만 사용할 수 있어요.',
    );
  }

  return context;
}
