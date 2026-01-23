import { useMutation } from '@tanstack/react-query';

import { REQUEST, userPut } from '@/shared/api';

const putUserProfile = async (data: FormData) => {
  await userPut({ request: REQUEST.UPDATE_USER_PICTURE, data: data });
};

export const usePutUserProfile = () => {
  return useMutation({
    mutationFn: putUserProfile,
  });
};
