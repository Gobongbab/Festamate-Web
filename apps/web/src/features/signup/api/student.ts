import { post, REQUEST } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

export interface StudentCertificationResponse {
  isSuccess: boolean;
  message: string;
  result: {
    name: string;
    studentDepartment: string;
    studentId: string;
  };
}

const submitStudentCertification = async (formData: FormData) => {
  const response = await post<FormData, StudentCertificationResponse>({
    request: REQUEST.CERTIFY_STUDENT,
    data: formData,
  });
  return response.data;
};

export const useCertifyStudent = () => {
  return useMutation({
    mutationFn: submitStudentCertification,
  });
};
