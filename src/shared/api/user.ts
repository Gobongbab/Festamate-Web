import axios, { AxiosHeaders, AxiosResponse } from 'axios';

interface PostRequestParams<TData> {
  request: string;
  headers?: AxiosHeaders;
  data?: TData;
}

interface GetRequestParams<TParams> {
  request: string;
  headers?: AxiosHeaders;
  params?: TParams;
}

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

// instance.interceptors.response.use(
//   response => response,
//   async (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       const stored = sessionStorage.getItem('userToken');

//       if (stored) {
//         const parsed = JSON.parse(stored);
//         const refreshToken = parsed.accessToken;
//         try {
//           const response = await post<
//             { refreshToken: string },
//             RefreshTokenResponse
//           >({
//             request: REQUEST.REFRESH,
//             data: { refreshToken },
//           });
//           const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
//             response.data;
//           sessionStorage.setItem(
//             'userToken',
//             `{
//             accessToken: ${newAccessToken},
//             refreshToken: ${newRefreshToken},
//           }`,
//           );
//         } catch (refreshError) {
//           console.log(refreshError);
//         }
//       }
//     }
//     return Promise.reject(error);
//   },
// );

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
    if (axios.isAxiosError(error)) throw new Error(error.message);
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
    if (axios.isAxiosError(error)) throw new Error(error.message);
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
    if (axios.isAxiosError(error)) throw new Error(error.message);
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
    if (axios.isAxiosError(error)) throw new Error(error.message);
    else throw new Error('에러가 발생했습니다');
  }
}
