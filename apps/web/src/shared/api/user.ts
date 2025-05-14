import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { REQUEST } from './requests';
import { post } from './axios';
import { RAW_PATH } from '../constants';

import { logout } from '@/widgets/user/utils';

interface PostRequestParams<TData> {
  request: string;
  headers?: AxiosHeaders | { [key: string]: string };
  data?: TData;
}

interface GetRequestParams<TParams> {
  request: string;
  headers?: AxiosHeaders;
  params?: TParams;
}

type RefreshTokenResponse = {
  accessToken: string;
};

const instance = axios.create({
  baseURL: 'https://www.festamate.shop/api',
});

instance.interceptors.request.use(async config => {
  const stored = sessionStorage.getItem('userToken');
  if (stored) {
    const parsed = JSON.parse(stored);
    const accessToken = parsed.accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        const response = await post<unknown, RefreshTokenResponse>({
          request: REQUEST.REFRESH,
        });
        const { accessToken: newAccessToken } = response.data;
        sessionStorage.setItem(
          'userToken',
          JSON.stringify({ accessToken: newAccessToken }),
        );
        const originalRequest = error.config as AxiosRequestConfig;
        if (originalRequest) {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };
          return instance(originalRequest);
        }
      } catch {
        alert('토큰 갱신에 실패했어요 ㅠㅠ');
        logout();
        window.location.replace(RAW_PATH.HOME);
      }
    }
    return Promise.reject(error);
  },
);

export async function userGet<TResponse, TParams = unknown>(
  config: GetRequestParams<TParams>,
): Promise<AxiosResponse<TResponse>> {
  const { request, headers, params } = config;
  try {
    const response = await instance.get<TResponse>(request, {
      params: params,
      headers: headers || undefined,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error)) throw new Error(error.message);
    else throw new Error('에러가 발생했습니다');
  }
}

export async function userPost<TData, TResponse = unknown>(
  config: PostRequestParams<TData>,
): Promise<AxiosResponse<TResponse>> {
  const { request, headers, data } = config;
  try {
    const response = await instance.post<
      TResponse,
      AxiosResponse<TResponse>,
      TData
    >(request, data, {
      headers: headers || undefined,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error))
      throw new Error(error.response?.data.message);
    else throw new Error('에러가 발생했습니다');
  }
}

export async function userPut<TData, TResponse = unknown>(
  config: PostRequestParams<TData>,
): Promise<AxiosResponse<TResponse>> {
  const { request, headers, data } = config;
  try {
    const response = await instance.put<
      TResponse,
      AxiosResponse<TResponse>,
      TData
    >(request, data, { headers: headers || undefined });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error))
      throw new Error(error.response?.data.message);
    else throw new Error('에러가 발생했습니다');
  }
}

export async function userDel<TResponse = unknown>(
  config: Omit<PostRequestParams<unknown>, 'data'>,
): Promise<AxiosResponse<TResponse>> {
  const { request, headers } = config;
  try {
    const response = await instance.delete<TResponse, AxiosResponse<TResponse>>(
      request,
      {
        headers: headers || undefined,
      },
    );
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error))
      throw new Error(error.response?.data.message);
    else throw new Error('에러가 발생했습니다');
  }
}

export async function userPatch<TData, TResponse = unknown>(
  config: PostRequestParams<TData>,
): Promise<AxiosResponse<TResponse>> {
  const { request, headers, data } = config;
  try {
    const response = await instance.patch<
      TResponse,
      AxiosResponse<TResponse>,
      TData
    >(request, data, {
      headers: headers || undefined,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error))
      throw new Error(error.response?.data.message);
    else throw new Error('에러가 발생했습니다');
  }
}
