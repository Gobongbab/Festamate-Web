import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { fetchLoginStatus } from '@festamate/utils';
import { PATH } from '@/shared/constants';

export default function AuthRouter() {
  return fetchLoginStatus() ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
}
