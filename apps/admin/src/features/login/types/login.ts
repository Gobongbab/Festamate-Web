import { LOGIN } from '@/features/login/model';

export type Login = {
  [key in (typeof LOGIN)[keyof typeof LOGIN]]: string;
};
