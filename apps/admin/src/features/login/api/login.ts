import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { post, REQUEST } from '@/shared/api';
import { PATH } from '@/shared/constants';

import { Login } from '@/features/login/types';

interface LoginResponse {
  isSuccess: boolean;
  message: string;
  result: {
    accessToken: string;
  };
}

const submitLoginData = async (data: Login) => {
  const response = await post<Login, LoginResponse>({
    request: REQUEST.LOGIN,
    data: data,
  });
  return response.data;
};

export const useSubmitLoginData = () => {
  const navigate = useNavigate();

  return useMutation<LoginResponse, unknown, Login>({
    mutationFn: submitLoginData,
    onSuccess: data => {
      sessionStorage.setItem('userToken', JSON.stringify(data.result));
      navigate(PATH.HOME);
    },
  });
};
