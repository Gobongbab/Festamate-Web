import { type RouteObject } from 'react-router-dom';

import { AppLayout } from '@/app/layouts';
import { PATH } from '@/shared/constants';
import { Loader } from '@/shared/ui';

import { HomePage } from '@/pages/home/ui';
import { ReportPage } from '@/pages/report/ui';
import { UserPage } from '@/pages/user/ui';

import { fetchEntireReports } from '@/features/report/api';

export const HomeRoutes: RouteObject = {
  element: <AppLayout />,
  path: PATH.HOME,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    { path: PATH.USER, element: <UserPage /> },
    {
      path: PATH.REPORT,
      element: <ReportPage />,
      loader: fetchEntireReports,
      hydrateFallbackElement: <Loader />,
    },
  ],
};
