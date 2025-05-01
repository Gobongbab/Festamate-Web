import { REQUEST, userGet } from '@/shared/api';
import { Report } from '@/features/report/types';

interface EntireReportsResponse {
  isSuccess: boolean;
  message: string;
  result: Report[];
}

export const fetchEntireReports = async (): Promise<Report[]> => {
  const response = await userGet<EntireReportsResponse>({
    request: REQUEST.REPORT,
  });
  return response.data.result;
};
