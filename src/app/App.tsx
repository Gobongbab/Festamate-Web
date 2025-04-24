import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Stack } from '@/app/stackflow';

import { RAW_PATH } from '@/shared/constants';
import { userAtom } from '@/shared/atom';
import { handleAllowNotification } from '@/shared/utils';

import { AuthScreen } from '@/screen/auth/ui';
import { SignupScreen } from '@/screen/signup/ui';

export default function App() {
  const setUserAtom = useSetAtom(userAtom);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserAtom(parsed);
      } catch (e) {
        console.error('유저 정보 파싱 실패', e);
      }
    }
    handleAllowNotification();
  }, []);

  const router = createBrowserRouter([
    {
      path: RAW_PATH.HOME,
      element: <Stack />,
    },
    { path: RAW_PATH.AUTH, element: <AuthScreen /> },
    { path: RAW_PATH.SIGNUP, element: <SignupScreen /> },
  ]);

  return <RouterProvider router={router} />;
}
