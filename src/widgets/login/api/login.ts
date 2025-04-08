import { get, REQUEST } from '@/shared/api';

interface FetchLoginResponse {
  access_token: string;
  refresh_token: string;
}

export const fetchLogin = async () => {
  const response = await get<FetchLoginResponse>({
    request: REQUEST.LOGIN,
  });
  console.log(response);
  return response.data;
};
