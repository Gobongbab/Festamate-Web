import { useFormContext } from 'react-hook-form';
import { CreateFormData } from '@/widgets/create/model';

export default function useRoomCreateContext() {
  const context = useFormContext<CreateFormData>();

  if (!context) {
    throw new Error(
      'useRoomCreateContext는 CreateProvider 안에서만 사용할 수 있어요.',
    );
  }

  return context;
}
