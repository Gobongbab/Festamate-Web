import { getPath } from '@festamate/utils';

import { REQUEST, userGet, userPost } from '@/shared/api';
import { useMutation, useQuery } from '@tanstack/react-query';
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

const submitUserBlock = async (userId: string) => {
  await userPost({
    request: REQUEST.USER_BLOCK.split('{userId}').join(userId),
  });
};

const submitUserUnBlock = async (userId: string) => {
  await userPost({
    request: REQUEST.USER_UNBLOCK.split('{userId}').join(userId),
  });
};

export const useFetchUserInfo = (userId: string) => {
  return useQuery<UserInfoResponse, unknown, User>({
    queryKey: ['user', userId],
    queryFn: () => fetchUserInfo(userId),
    enabled: false,
    select: data => data.result,
  });
};

export const useSubmitUserBlock = () => {
  return useMutation({
    mutationFn: submitUserBlock,
  });
};

export const useSubmitUserUnBlock = () => {
  return useMutation({
    mutationFn: submitUserUnBlock,
  });
};
