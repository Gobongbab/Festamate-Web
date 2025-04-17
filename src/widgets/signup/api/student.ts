import { post, REQUEST } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

interface StudentCertificationProps {
  formData: FormData;
  kakaoAccessToken: string;
}

interface StudentCertificationResponse {
  isSuccess: boolean;
  message: string;
  result: {
    name: string;
    studentDepartment: string;
    studentId: string;
  };
}

const submitStudentCertification = async ({
  formData,
  kakaoAccessToken,
}: StudentCertificationProps) => {
  const response = await post<FormData, StudentCertificationResponse>({
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
