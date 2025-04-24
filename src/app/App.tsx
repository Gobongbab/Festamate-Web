import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getToken } from 'firebase/messaging';

import { messaging } from './fcm';

import { Stack } from '@/app/stackflow';

import { AuthScreen } from '@/screen/auth/ui';
import { SignupScreen } from '@/screen/signup/ui';
import { RAW_PATH } from '@/shared/constants';
import { userAtom } from '@/shared/atom';

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

async function handleAllowNotification() {
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    console.log('알림 권한이 허용되었습니다.');
    await getDeviceToken();
  } else if (permission === 'denied') {
    console.log('알림 권한이 거부되었습니다.');
  } else {
    console.log('사용자가 알림 권한을 결정하지 않았습니다.');
  }
}

async function getDeviceToken() {
  await getToken(messaging, {
    vapidKey: import.meta.env.VITE_VAPID_KEY,
  })
    .then(currentToken => {
      if (currentToken) {
        console.log('토큰: ', currentToken);
      } else {
        console.log('토큰을 가져오지 못했습니다. 권한을 다시 요청하세요.');
      }
    })
    .catch(err => {
      alert(err);
      console.log('토큰을 가져오는 중 에러 발생: ', err);
    });
}
