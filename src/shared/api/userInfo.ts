import { REQUEST, userGet } from '@/shared/api';
import { User } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { userAtom } from '@/shared/atom';
import { useEffect } from 'react';
import { fetchLoginStatus } from '../utils';

interface UserInfoResponse {
  isSuccess: boolean;
  message: string;
  result: User;
}

const fetchUserInfo = async () => {
  const response = await userGet<UserInfoResponse>({
    request: REQUEST.USER_INFO,
  });
  return response.data.result;
};

export const useFetchUserInfo = () => {
  const setUserAtom = useSetAtom(userAtom);
  const queryResult = useQuery<User, Error>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    enabled: fetchLoginStatus(),
  });

  useEffect(() => {
    if (queryResult.data) {
      setUserAtom(queryResult.data);
      localStorage.setItem('user', JSON.stringify(queryResult.data));
    }
  }, [queryResult.data, setUserAtom]);

  return queryResult;
};
