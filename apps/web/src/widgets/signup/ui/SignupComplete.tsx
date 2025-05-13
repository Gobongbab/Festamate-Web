import React from 'react';

import { Button } from '@/shared/ui';
import { RAW_PATH } from '@/shared/constants';
import { getPath } from '@festamate/utils';

export default function SignupComplete() {
  // const { handleAllowNotification } = useAllowNotification();
  // const { mutate } = useSubmitFcmToken();
  // const fcmToken = useAtomValue(fcmTokenAtom);

  // // const handleNotificationClick = async () => {
  // //   console.log('clicked!');
  // //   await handleAllowNotification();
  // //   console.log(fcmToken);
  // //   mutate(fcmToken, {
  // //     onSuccess: () => {
  // //       alert('성공! 홈으로 이동합니다.');
  // //       window.location.replace(
  // //         `${getPath(import.meta.env.VITE_PRODUCTION_URL, RAW_PATH.HOME)}`,
  // //       );
  // //     },
  // //   });
  // // };

  const handleHomeClick = () =>
    window.location.replace(
      `${getPath(import.meta.env.VITE_PRODUCTION_URL, RAW_PATH.HOME)}`,
    );

  return (
    <div className='grid h-100 w-full place-items-center'>
      <div className='flex w-[80%] flex-col items-start gap-3'>
        <div>
          <p className='text-xl font-semibold'>축하해요!</p>
          <p className='text-xl font-semibold'>가입이 완료되었어요.</p>
        </div>
        {/* <NotificationGuide /> */}
        <div className='mt-1 flex flex-col items-start gap-1.5'>
          {/* <Button
            name='go-home'
            size='sm'
            className='active:bg-border font-semibold'
            onClick={handleNotificationClick}
            label='알림 허용하기'
          /> */}
          <Button
            name='go-home'
            size='sm'
            className='active:bg-border'
            onClick={handleHomeClick}
            label='서비스 이용하기'
          />
        </div>
      </div>
    </div>
  );
}

// const NotificationGuide = () => (
//   <div className='flex flex-col'>
//     <p className='my-3 text-lg font-medium'>🔔 알림을 허용해 주세요!</p>
//     보다 더 편리한 Festamate! 사용을 위해서는,
//     <br /> 알림 권한이 필요해요.
//     <br /> 광고성 알림은 전혀 없으며, 참여한 모임의 매칭 완료나
//     <br />
//     채팅방의 새 메시지에 대해서만 알려드려요.
//     <br />
//     중요한 소식을 놓치지 않도록 알림을 꼭 허용해 주세요!
//   </div>
// );
