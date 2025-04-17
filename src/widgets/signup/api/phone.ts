import { useMutation } from '@tanstack/react-query';
import { post, REQUEST } from '@/shared/api';

interface SubmitPhoneNumberRequest {
  phoneNumber: string;
}

interface SubmitCodeRequest {
  phoneNumber: string;
  code: string;
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

export const useSubmitCode = () => {
  return useMutation({ mutationFn: submitCode });
};
