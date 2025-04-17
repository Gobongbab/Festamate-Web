import './index.css';
import '@/app/fcm';
import '@stackflow/plugin-basic-ui/index.css';

import { Provider } from 'jotai';
import { getToken } from 'firebase/messaging';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Stack } from '@/app/stackflow';
import { messaging } from '@/app/fcm';
import { AuthScreen } from '@/screen/auth/ui';
import { SignupScreen } from '@/screen/signup/ui';
import { RAW_PATH } from '@/shared/constants';

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

handleAllowNotification();

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: RAW_PATH.HOME,
    element: <Stack />,
  },
  { path: RAW_PATH.AUTH, element: <AuthScreen /> },
  { path: RAW_PATH.SIGNUP, element: <SignupScreen /> },
]);

createRoot(document.getElementById('root')!).render(
  <Provider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>,
);
