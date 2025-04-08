import { post, REQUEST } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

const certifyStudent = async ({
  formData,
  token,
}: {
  formData: FormData;
  token: string;
}) => {
  const response = await post<FormData>(
    REQUEST.CERTIFY_STUDENT,
    formData,
    token,
  );
  return response.data;
};

export const useCertifyStudent = () => {
  return useMutation({ mutationFn: certifyStudent });
};
