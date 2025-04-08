import { post, REQUEST } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

interface CertifyPhoneNumberRequest {
  phoneNumber: string;
}

const certifyPhoneNumber = async ({
  phone,
  token,
}: {
  phone: string;
  token: string;
}) => {
  const response = await post<CertifyPhoneNumberRequest>(
    REQUEST.CERTIFY_PHONE,
    {
      phoneNumber: phone,
    },
    token,
  );
  return response.data;
};

export const useCertifyPhoneNumber = () => {
  return useMutation({ mutationFn: certifyPhoneNumber });
};
