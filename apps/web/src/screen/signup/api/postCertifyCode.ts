import { useMutation } from '@tanstack/react-query';
import type { Dispatch, SetStateAction } from 'react';
import { post, REQUEST } from '@/shared/api';

interface SubmitCodeRequest {
  phoneNumber: string;
  code: string;
}

interface SubmitCodeParams {
  setProcess: Dispatch<SetStateAction<number>>;
}

const postCertifyCode = async ({ phoneNumber, code }: SubmitCodeRequest) => {
  await post<SubmitCodeRequest>({
    request: REQUEST.CERTIFY_CODE,
    data: { phoneNumber: phoneNumber, code: code },
  });
};

export const usePostCertifyCode = ({ setProcess }: SubmitCodeParams) => {
  return useMutation({
    mutationFn: postCertifyCode,
    onSuccess: () => setProcess(prev => prev + 1),
  });
};
