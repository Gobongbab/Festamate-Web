import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthRoutes, HomeRoutes } from '@/app/routes';
import AuthRouter from './router/AuthRouter';

export default function App() {
  const router = createBrowserRouter([
    AuthRoutes,
    { element: <AuthRouter />, children: [HomeRoutes] },
  ]);

  return <RouterProvider router={router} />;
}
