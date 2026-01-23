import React from 'react';

import { MODAL } from '@/shared/constants';
import { Button, Modal } from '@/shared/ui';
import { useModal } from '@/shared/hook';
import { OpenChatGuide } from '@/assets/images';

export default function OpenChatGuideModal() {
  const { closeModal, modalState } = useModal();
  const { isOpen } = modalState(MODAL.OPEN_CHAT_GUIDE);
  const onClose = () => closeModal(MODAL.OPEN_CHAT_GUIDE);

  return (
    <>
      {isOpen && (
        <Modal modalKey={MODAL.OPEN_CHAT_GUIDE}>
          <>
            <p className='text-lg font-semibold'>
              오픈채팅 생성 시 유의해주세요!
            </p>
            <div className='flex flex-col gap-2'>
              <img src={OpenChatGuide} />
              <p>
                ✅ 프로필 제한하지 않기
                <br />
                익명성 보장을 위해 커스텀 프로필도 허용해주세요.
              </p>
              <p>
                ✅ 입장 조건 설정하지 않기
                <br />
                매칭된 멤버가 입장하지 못할 수 있어요.
              </p>
            </div>
            <div className='mt-2 flex gap-3'>
              <Button
                name='deleteWithdraw'
                label='확인했어요'
                size='md'
                onClick={onClose}
              />
            </div>
          </>
        </Modal>
      )}
    </>
  );
}
