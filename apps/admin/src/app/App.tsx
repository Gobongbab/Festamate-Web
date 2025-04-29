import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PATH } from '@/shared/constants/path';
import { HomePage } from '@/page/home/ui';

export default function App() {
  const router = createBrowserRouter([
    { path: PATH.HOME, element: <HomePage /> },
  ]);

  return <RouterProvider router={router} />;
}
