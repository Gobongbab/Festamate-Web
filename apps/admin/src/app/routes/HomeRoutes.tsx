import { type RouteObject } from 'react-router-dom';

import { AppLayout } from '@/app/layouts';
import { HomePage } from '@/pages/home/ui';
import { PATH } from '@/shared/constants';
import { UserPage } from '@/pages/user/ui';
import { ReportPage } from '@/pages/report/ui';

export const HomeRoutes: RouteObject = {
  element: <AppLayout />,
  path: PATH.HOME,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    { path: PATH.USER, element: <UserPage /> },
    { path: PATH.REPORT, element: <ReportPage /> },
  ],
};
