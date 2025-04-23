import { REQUEST, userGet } from '@/shared/api';
import { User } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';

interface UserInfoResponse {
  isSuccess: boolean;
  message: string;
  result: User;
}

const fetchUserInfo = async () => {
  console.log('start~..');
  const response = await userGet<UserInfoResponse>({
    request: REQUEST.USER_INFO,
  });
  return response.data.result;
};

export const useFetchUserInfo = () => {
  return useMutation({
    mutationFn: fetchUserInfo,
    onSuccess: data => {
      localStorage.setItem('user', JSON.stringify(data));
      window.location.replace(`${import.meta.env.VITE_PRODUCTION_URL}`);
    },
  });
};
