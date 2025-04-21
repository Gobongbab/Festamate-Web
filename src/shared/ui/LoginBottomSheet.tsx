import React from 'react';

import { BottomSheet, Button } from '@/shared/ui';
import { KakaoIcon } from '@/assets/icons';
import { BOTTOM_SHEET } from '../constants';
import { useBottomSheet } from '../hook';

export default function LoginBottomSheet() {
  const { closeBottomSheet, bottomSheetState } = useBottomSheet();
  const { isOpen } = bottomSheetState(BOTTOM_SHEET.LOGIN);

  const handleClick = () => {
    closeBottomSheet(BOTTOM_SHEET.LOGIN);
    window.location.replace(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}`,
    );
  };

  return (
    <>
      {isOpen && (
        <BottomSheet sheetKey={BOTTOM_SHEET.LOGIN}>
          <div className='flex items-baseline justify-between'>
            <span className='text-xl font-semibold'>
              로그인이 필요한 기능이에요!
            </span>
            <button
              className='text-md focus:outline-none'
              name='close-bottom-sheet'
              onClick={() => closeBottomSheet(BOTTOM_SHEET.LOGIN)}
            >
              닫기
            </button>
          </div>
          <Button
            onClick={handleClick}
            size='md'
            className='text-dark bg-kakao hover:bg-kakao mt-6 h-fit py-3 font-medium'
            label={
              <div className='flex w-full items-center justify-center gap-x-4 py-1'>
                <img src={KakaoIcon} className='size-6' />
                <span>카카오톡 간편 로그인</span>
              </div>
            }
            shadow={false}
          />
        </BottomSheet>
      )}
    </>
  );
}
