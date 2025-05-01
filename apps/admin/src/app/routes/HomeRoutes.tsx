import { type RouteObject } from 'react-router-dom';

import { AppLayout } from '@/app/layouts';
import { PATH } from '@/shared/constants';
import { Loader } from '@/shared/ui';

import { HomePage } from '@/pages/home/ui';
import { ReportPage } from '@/pages/report/ui';
import { UserPage } from '@/pages/user/ui';
import { RoomPage } from '@/pages/room/ui';

import { fetchEntireReports } from '@/features/report/api';
import { fetchRooms } from '@/features/room/api';

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
    {
      path: PATH.ROOM,
      element: <RoomPage />,
      loader: fetchRooms,
      hydrateFallbackElement: <Loader />,
    },
  ],
};
