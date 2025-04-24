import { useMutation } from '@tanstack/react-query';

import { REQUEST, userPatch } from '@/shared/api';

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

export const useUpdateUserInfo = () => {
  return useMutation({
    mutationFn: updateUserInfo,
  });
};
