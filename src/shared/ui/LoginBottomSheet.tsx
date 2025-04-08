import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { cn } from '@/shared/utils';
import { Button } from '@/shared/ui';
import { useFlow } from '@/app/stackflow';
import { PATH } from '../constants';

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
  const { push } = useFlow();

  const handleClick = () => {
    setIsOpen(false);
    setVisible(false);
    push(PATH.LOGIN, {});
  };

  const handleJoinClick = () => {
    setIsOpen(false);
    setVisible(false);
    push(PATH.SIGNUP, {});
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
          className='mt-6'
          shadow={false}
          label='로그인'
          onClick={handleClick}
        />
        <div className='flex items-baseline justify-between'>
          <span className='text-lg font-medium'>계정이 없나요?</span>
          <button
            className='text-md cursor-pointer focus:outline-none'
            name='close-bottom-sheet'
            onClick={handleJoinClick}
          >
            <u>회원가입 하러가기</u>
          </button>
        </div>
      </div>
    </>
  );
}
