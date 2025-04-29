import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomeRoutes } from '@/app/routes';

export default function App() {
  const router = createBrowserRouter([HomeRoutes]);

  return <RouterProvider router={router} />;
}
