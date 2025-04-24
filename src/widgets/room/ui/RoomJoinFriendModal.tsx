import React from 'react';

import { MODAL } from '@/shared/constants';
import { Button, Input, Modal } from '@/shared/ui';
import { useModal } from '@/shared/hook';

import { useSubmitRoomJoin } from '@/widgets/room/api';

interface RoomJoinFriendModalProps {
  availableFriendCnt: number;
  roomId: number;
}

export default function RoomJoinFriendModal({
  availableFriendCnt,
  roomId,
}: RoomJoinFriendModalProps) {
  const { closeModal, modalState } = useModal();
  const { mutate } = useSubmitRoomJoin(roomId);
  const { isOpen } = modalState(MODAL.JOIN_WITH_FRIEND);

  const onClose = () => closeModal(MODAL.JOIN_WITH_FRIEND);
  const onJoin = () => mutate(roomId);

  return (
    <>
      {isOpen && (
        <Modal modalKey={MODAL.JOIN_WITH_FRIEND}>
          <p className='text-lg font-semibold'>친구와 함께 참여하기</p>
          <p>
            함께할 친구를 불러주세요! 친구도 Festamate!에 가입되어 있어야 함께
            참여할 수 있어요.
          </p>
          {Array.from({ length: availableFriendCnt }).map((_, i) => (
            <FriendInput key={i} />
          ))}
          <div className='mt-2 flex gap-3'>
            <Button
              halfWidth
              noMargins
              label='더 생각해 볼래요'
              onClick={onClose}
              className='bg-sub hover:bg-border text-dark m-0'
              size='md'
            />
            <Button
              halfWidth
              noMargins
              label='함께 참여하기'
              className='m-0'
              size='md'
              onClick={onJoin}
              disabled
            />
          </div>
        </Modal>
      )}
    </>
  );
}

const FriendInput = () => (
  <div className='flex w-full gap-2'>
    <div className='flex-1'>
      <Input
        id='co-founder'
        placeholder='전화번호'
        type='phone'
        // onChange={e => {
        //   const rawValue = e.target.value;
        //   const formattedValue = getFormattedPhone(rawValue);
        // }} 차후 해당 로직 연결 & 데이터 패칭 진행하면 됩니다.
      />
    </div>
    <button
      id='co-founder'
      type='button'
      className='bg-fill rounded-5 border-border hover:bg-sub cursor-pointer border-[1px] px-4 py-2'
    >
      확인
    </button>
  </div>
);
