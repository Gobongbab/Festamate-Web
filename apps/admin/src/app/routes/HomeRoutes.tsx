import { type RouteObject } from 'react-router-dom';

import { AppLayout } from '@/app/layouts';
import { HomePage } from '@/pages/home/ui';
import { PATH } from '@/shared/constants';

export const HomeRoutes: RouteObject = {
  element: <AppLayout />,
  path: PATH.HOME,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
  ],
};
