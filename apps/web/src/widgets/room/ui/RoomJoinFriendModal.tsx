import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { getFormattedPhone } from '@festamate/utils';

import { MODAL } from '@/shared/constants';
import { Button, Input, Modal } from '@/shared/ui';
import { useModal } from '@/shared/hook';

import { useSubmitFriendPhone, useSubmitRoomJoin } from '@/widgets/room/api';
import { useAtomValue, useSetAtom } from 'jotai';
import { errorMessageAtom, userAtom } from '@/shared/atom';
import { Gender } from '@/shared/types';

interface RoomJoinFriendModalProps {
  availableFriendCnt: number;
  roomId: number;
  preferredGender: Gender;
}

interface FriendInputProps {
  setFriendPhoneNumbers: Dispatch<SetStateAction<string[]>>;
  preferredGender: Gender;
}

export default function RoomJoinFriendModal({
  preferredGender,
  availableFriendCnt,
  roomId,
}: RoomJoinFriendModalProps) {
  const { openModal, closeModal, modalState } = useModal();
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const { isOpen } = modalState(MODAL.JOIN_WITH_FRIEND);
  const [friendPhoneNumbers, setFriendPhoneNumbers] = useState<string[]>([]);
  const { mutate, reset, isPending } = useSubmitRoomJoin(roomId);

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  const onClose = () => closeModal(MODAL.JOIN_WITH_FRIEND);
  const onJoin = () =>
    mutate(
      { roomId: roomId, friendPhoneNumbers: friendPhoneNumbers },
      {
        onError: error => {
          closeModal(MODAL.JOIN_WITH_FRIEND);
          setErrorMessage(error.message);
          openModal(MODAL.ERROR);
        },
      },
    );

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
            <FriendInput
              key={i}
              setFriendPhoneNumbers={setFriendPhoneNumbers}
              preferredGender={preferredGender}
            />
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
              disabled={
                friendPhoneNumbers.length < availableFriendCnt / 2 || isPending
              }
            />
          </div>
        </Modal>
      )}
    </>
  );
}

const FriendInput = ({
  setFriendPhoneNumbers,
  preferredGender,
}: FriendInputProps) => {
  const [value, setValue] = useState<string>('');
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const { mutate } = useSubmitFriendPhone();
  const { phoneNumber } = useAtomValue(userAtom)!;

  return (
    <div className='flex gap-2'>
      <div className='flex-1'>
        <Input
          id='co-founder'
          placeholder='전화번호'
          type='phone'
          value={value}
          onChange={e => {
            const rawValue = e.target.value;
            const formattedValue = getFormattedPhone(rawValue);
            setValue(formattedValue);
          }}
          disabled={isAdded}
        />
      </div>
      <button
        id='co-founder'
        type='button'
        className='bg-fill rounded-5 border-border hover:bg-sub cursor-pointer border-[1px] px-4 py-2'
        onClick={() => {
          if (phoneNumber === value)
            alert('자신의 번호는 친구로 추가할 수 없어요.');
          else {
            mutate(value, {
              onSuccess: data => {
                if (
                  data.result.exist &&
                  data.result.gender === preferredGender
                ) {
                  alert('친구를 추가했어요!');
                  setFriendPhoneNumbers(prev => [...prev, value]);
                  setIsAdded(true);
                } else if (data.result.gender !== preferredGender) {
                  alert('참여 성별이 아닙니다.');
                } else {
                  alert('가입하지 않은 친구입니다.');
                }
              },
            });
          }
        }}
      >
        친구 추가
      </button>
    </div>
  );
};
