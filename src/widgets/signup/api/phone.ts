import { useMutation } from '@tanstack/react-query';
import type { Dispatch, SetStateAction } from 'react';
import { post, REQUEST } from '@/shared/api';

interface SubmitPhoneNumberRequest {
  phoneNumber: string;
}

interface SubmitCodeRequest {
  phoneNumber: string;
  code: string;
}

interface SubmitCodeParams {
  setProcess: Dispatch<SetStateAction<number>>;
}

const submitPhoneNumber = async ({ phoneNumber }: SubmitPhoneNumberRequest) => {
  await post<SubmitPhoneNumberRequest>({
    request: REQUEST.CERTIFY_PHONE,
    data: { phoneNumber: phoneNumber },
  });
};

const submitCode = async ({ phoneNumber, code }: SubmitCodeRequest) => {
  await post<SubmitCodeRequest>({
    request: REQUEST.CERTIFY_CODE,
    data: { phoneNumber: phoneNumber, code: code },
  });
};

export const useSubmitPhoneNumber = () => {
  return useMutation({ mutationFn: submitPhoneNumber });
};

export const useSubmitCode = ({ setProcess }: SubmitCodeParams) => {
  return useMutation({
    mutationFn: submitCode,
    onSuccess: () => setProcess(prev => prev + 1),
  });
};
