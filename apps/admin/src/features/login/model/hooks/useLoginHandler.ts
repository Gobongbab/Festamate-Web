import { Dispatch, SetStateAction } from 'react';

import { Login } from '@/features/login/types';
import { useSubmitLoginData } from '@/features/login/api';

interface LoginHandlerProps {
  setError: Dispatch<SetStateAction<string | null>>;
}

export default function useLoginHandler({ setError }: LoginHandlerProps) {
  const { mutate: login } = useSubmitLoginData();

  const handleLoginSubmit = (data: Login) => {
    login(data, {
      onSuccess: () => setError(null),
      onError: () => setError('*아이디와 비밀번호를 확인해 주세요.'),
    });
  };
  return { handleLoginSubmit };
}
