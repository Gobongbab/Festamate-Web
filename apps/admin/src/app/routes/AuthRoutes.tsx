import { type RouteObject } from 'react-router-dom';

import { PATH } from '@/shared/constants';
import { LoginPage } from '@/page/login/ui';

export const AuthRoutes: RouteObject = {
  path: PATH.LOGIN,
  element: <LoginPage />,
};
