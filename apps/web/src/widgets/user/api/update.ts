import { useMutation } from '@tanstack/react-query';

import { REQUEST, userPatch, userPut } from '@/shared/api';

interface UpdateUserInfoRequest {
  nickname?: string;
  loginPasswordToUpdate?: string;
}

const updateUserInfo = async (data: UpdateUserInfoRequest) => {
  await userPatch<UpdateUserInfoRequest>({
    request: REQUEST.UPDATE_USER,
    data: data,
  });
};

const updateUserProfile = async (data: FormData) => {
  await userPut({ request: REQUEST.UPDATE_USER_PICTURE, data: data });
};

export const useUpdateUserInfo = () => {
  return useMutation({
    mutationFn: updateUserInfo,
  });
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: updateUserProfile,
  });
};
