import axios, { AxiosHeaders, AxiosResponse } from 'axios';

interface GetRequestParams<TParams = unknown, THeaders = unknown> {
  request: string;
  headers?: THeaders;
  params?: TParams;
}

const instance = axios.create({
  baseURL: 'https://festamate.shop/api',
});

export const get = async <TResponse>({
  request,
  headers,
  params,
}: GetRequestParams): Promise<AxiosResponse<TResponse>> => {
  try {
    const response = await instance.get<TResponse>(`${request}`, {
      params: params,
      headers: headers as AxiosHeaders,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred');
  }
};

export const post = async <T>(request: string, data: T, token?: string) => {
  try {
    const response = await instance.post(`${request}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    const e = error as { message: string };
    throw new Error(e.message);
  }
};

export const del = async (request: string) => {
  try {
    const response = await instance.delete(`${request}`);
    return response;
  } catch (error) {
    const e = error as { message: string };
    throw new Error(e.message);
  }
};
