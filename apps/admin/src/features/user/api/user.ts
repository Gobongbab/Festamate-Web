import { getPath } from '@festamate/utils';

import { REQUEST, userGet } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/features/user/types';

interface UserInfoResponse {
  isSuccess: boolean;
  message: string;
  result: User;
}

const fetchUserInfo = async (userId: string) => {
  const response = await userGet<UserInfoResponse>({
    request: getPath(REQUEST.USER, userId),
    params: { userId: Number(userId) },
  });
  return response.data;
};

export const useFetchUserInfo = (userId: string) => {
  return useQuery<UserInfoResponse, unknown, User>({
    queryKey: ['user', userId],
    queryFn: () => fetchUserInfo(userId),
    enabled: false,
    select: data => data.result,
  });
};
