import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { cn } from '@/shared/utils';
import { Button } from '@/shared/ui';
import { KakaoIcon } from '@/assets/icons';

interface LoginBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LoginBottomSheet({
  isOpen,
  onClose,
  setIsOpen,
}: LoginBottomSheetProps) {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
    setVisible(false);
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}`;
  };

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className={cn('overlay', visible && 'overlay-visible')}
          onClick={onClose}
        />
      )}

      <div
        className={cn(
          'rounded-t-10 fixed bottom-0 left-0 z-400 flex h-60 h-fit w-full flex-col bg-white p-6 pt-8 pb-12 shadow-lg transition-transform duration-300',
          isOpen ? 'translate-y-0' : 'translate-y-full',
          visible ? 'box-shadow-bottom-sheet block' : 'none',
        )}
      >
        <div className='flex items-baseline justify-between'>
          <span className='text-xl font-semibold'>
            로그인이 필요한 기능이에요!
          </span>
          <button
            className='text-md focus:outline-none'
            name='close-bottom-sheet'
            onClick={onClose}
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
      </div>
    </>
  );
}
