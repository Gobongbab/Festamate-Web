import './index.css';
import '@/app/fcm';
import '@stackflow/plugin-basic-ui/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import { Stack } from '@/app/stackflow';
import { getToken } from 'firebase/messaging';
import { messaging } from '@/app/fcm';
import { post, REQUEST } from '@/shared/api';

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

if (window.location.href.includes('/?code=')) {
  const baseUrl = window.location.href;
  const code = baseUrl.split('/?code=')[1];
  console.log(`카카오 인가코드: ${code}`);
  const response = await post(REQUEST.LOGIN, { code: code });
  console.log(response);
  window.location.replace('http://localhost:5173/');
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <Stack />
    </RecoilRoot>
  </QueryClientProvider>,
);
