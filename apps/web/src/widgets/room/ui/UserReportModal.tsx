import React, { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';

import { MODAL } from '@/shared/constants';
import { Button, Modal, Radio } from '@/shared/ui';
import { useModal } from '@/shared/hook';
import { errorMessageAtom } from '@/shared/atom';

import { useSubmitUserReport } from '@/widgets/room/api';
import { Reason } from '../types';

interface UserReportModalProps {
  userId: number;
}

export default function UserReportModal({ userId }: UserReportModalProps) {
  const { openModal, closeModal, modalState } = useModal();
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const { mutate, isError, reset } = useSubmitUserReport();
  const { isOpen } = modalState(MODAL.USER_REPORT);
  const [selectedReason, setSelectedReason] = useState<Reason>('UNHEALTHY');

  const onClose = () => closeModal(MODAL.USER_REPORT);
  const onReport = () =>
    mutate(
      { userId: userId, reason: selectedReason },
      {
        onSuccess: () => closeModal(MODAL.USER_REPORT),
        onError: error => {
          closeModal(MODAL.USER_REPORT);
          setErrorMessage(error.message);
          openModal(MODAL.ERROR);
        },
      },
    );

  const REPORT: Record<Reason, string> = {
    UNHEALTHY: '부적절한 내용',
    ADVERTISING: '광고 및 홍보',
    ABUSE: '욕설 및 비방',
    SPLASH: '도배',
    POLITICS: '정치적 발언',
    IMPERSONATION: '타인 사칭',
    ILLEGAL: '불법 행위',
  };

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  return (
    <>
      {isOpen && (
        <Modal modalKey={MODAL.USER_REPORT}>
          {!isError ? (
            <>
              <p className='text-lg font-semibold'>사용자 신고하기</p>
              <p>사용자를 신고할까요? 사유를 선택해주세요.</p>
              <div className='my-4 flex flex-col gap-3'>
                {Object.keys(REPORT).map(reason => (
                  <Radio
                    key={reason}
                    id={reason}
                    label={REPORT[reason as Reason]}
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason as Reason)}
                  />
                ))}
              </div>
              <div className='mt-2 flex gap-3'>
                <Button
                  halfWidth
                  noMargins
                  name='reportWithdraw'
                  label='취소'
                  className='bg-sub hover:bg-border text-dark m-0'
                  size='md'
                  onClick={onClose}
                />
                <Button
                  halfWidth
                  noMargins
                  name='reportConfirm'
                  label='신고하기'
                  className='m-0'
                  size='md'
                  onClick={onReport}
                />
              </div>
            </>
          ) : (
            <div className='grid h-10 place-items-center'>
              <div className='flex flex-col gap-2'>신고에 실패했어요</div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
