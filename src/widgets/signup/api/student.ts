import { post, REQUEST } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

interface StudentCertificationProps {
  formData: FormData;
  kakaoAccessToken: string;
}

const submitStudentCertification = async ({
  formData,
  kakaoAccessToken,
}: StudentCertificationProps) => {
  const response = await post<FormData>({
    request: REQUEST.CERTIFY_STUDENT,
    data: formData,
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}}`,
    },
  });
  return response.data;
};

export const useCertifyStudent = () => {
  return useMutation({ mutationFn: submitStudentCertification });
};
