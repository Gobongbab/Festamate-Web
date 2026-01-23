import { useMutation } from '@tanstack/react-query';
import { post, REQUEST } from '@/shared/api';

interface SubmitPhoneNumberRequest {
  phoneNumber: string;
}

const postCertifyPhone = async ({ phoneNumber }: SubmitPhoneNumberRequest) => {
  await post<SubmitPhoneNumberRequest>({
    request: REQUEST.CERTIFY_PHONE,
    data: { phoneNumber: phoneNumber },
  });
};

export const usePostCertifyPhone = () => {
  return useMutation({ mutationFn: postCertifyPhone });
};
