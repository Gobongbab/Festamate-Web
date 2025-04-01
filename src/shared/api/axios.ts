import axios, { AxiosHeaders } from 'axios';

const instance = axios.create({
  baseURL: 'http://festamate.shop/api',
});

export const get = async ({
  request,
  headers,
  params,
}: {
  request: string;
  headers?: unknown;
  params?: unknown;
}) => {
  try {
    const response = await instance.get(`${request}`, {
      params: params,
      headers: headers as AxiosHeaders,
    });
    return response;
  } catch (error: unknown) {
    const e = error as { message: string };
    throw new Error(e.message);
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
