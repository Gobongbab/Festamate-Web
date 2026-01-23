import { REQUEST, userPost } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

const postTicket = async (data: string) => {
  const response = await userPost({
    request: REQUEST.REGISTER_TICKET,
    data: { code: data },
    headers: { 'Content-Type': 'application/json' },
  });
  return response.status;
};

export const usePostTicket = () => {
  return useMutation({
    mutationFn: postTicket,
  });
};
