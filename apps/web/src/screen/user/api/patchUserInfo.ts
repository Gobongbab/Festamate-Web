import { useMutation } from '@tanstack/react-query';

import { REQUEST, userPatch } from '@/shared/api';

interface UpdateUserInfoRequest {
  nickname?: string;
  loginPasswordToUpdate?: string;
}

const patchUserInfo = async (data: UpdateUserInfoRequest) => {
  await userPatch<UpdateUserInfoRequest>({
    request: REQUEST.UPDATE_USER,
    data: data,
  });
};

export const usePatchUserInfo = () => {
  return useMutation({
    mutationFn: patchUserInfo,
  });
};
