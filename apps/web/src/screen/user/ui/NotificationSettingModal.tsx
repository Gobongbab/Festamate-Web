import React from 'react';

import { useAtomValue } from 'jotai';

import { MODAL } from '@/shared/constants';
import { Button, Modal, Toggle } from '@/shared/ui';
import { useModal } from '@/shared/hook';
import { notificationSettingAtom } from '@/shared/atom';

export default function AlermSettingModal() {
  const { closeModal, modalState } = useModal();
  const allowed = useAtomValue(notificationSettingAtom);
  const { isOpen } = modalState(MODAL.ALERT_SETTING);
  const onClose = () => closeModal(MODAL.ALERT_SETTING);

  return (
    <>
      {isOpen && (
        <Modal
          modalKey={MODAL.ALERT_SETTING}
          className='max-h-[70vh] overflow-y-hidden'
        >
          <p className='text-lg font-semibold'>알림 설정</p>
          <p>
            알림을 설정하면 모임 매칭 완료 여부, 삭제 등 다양한 정보를 푸시
            알림으로 받아볼 수 있어요!
          </p>
          <Toggle
            id='alertSetting'
            label={<span className='text-md'>알림 여부</span>}
            labelLeft
            className='my-2'
            checked={allowed}
          />
          <Button
            label='닫기'
            onClick={onClose}
            className='text-dark bg-sub hover:bg-border mt-2'
            size='md'
          />
        </Modal>
      )}
    </>
  );
}
