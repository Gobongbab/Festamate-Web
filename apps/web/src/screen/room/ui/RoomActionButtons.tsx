import React from 'react';
import { Button } from '@/shared/ui';

interface ActionButtonConfig {
  type: 'join' | 'host-chat' | 'participant-chat' | 'guest-join' | 'closed';
  withFriend?: boolean;
}

interface RoomActionButtonsProps {
  actionButtonConfig: ActionButtonConfig;
  handleJoin: () => void;
  handleJoinWithFriend: () => void;
  handleMoveToChat: () => void;
}

export default function RoomActionButtons({
  actionButtonConfig,
  handleJoin,
  handleJoinWithFriend,
  handleMoveToChat,
}: RoomActionButtonsProps) {
  const { type, withFriend } = actionButtonConfig;

  if (type === 'join') {
    return (
      <>
        {withFriend ? (
          <Button
            name='room-participate-with-friend'
            label='친구와 함께 참여하기'
            onClick={handleJoinWithFriend}
            className='mb-normal-spacing'
          />
        ) : (
          <Button
            name='room-participate'
            label='참여하기'
            onClick={handleJoin}
            className='mb-normal-spacing'
          />
        )}
      </>
    );
  }

  if (type === 'host-chat') {
    return (
      <Button
        name='room-chat'
        label='채팅방 이동'
        onClick={handleMoveToChat}
        className='mb-normal-spacing'
      />
    );
  }

  if (type === 'participant-chat') {
    return (
      <Button
        name='room-chat'
        label='오픈채팅방 이동'
        onClick={handleMoveToChat}
        className='mb-normal-spacing'
      />
    );
  }

  if (type === 'guest-join') {
    return (
      <>
        {withFriend ? (
          <Button
            name='room-participate-with-friend'
            label='친구와 함께 참여하기'
            onClick={handleJoinWithFriend}
            className='mb-normal-spacing'
          />
        ) : (
          <Button
            name='room-participate'
            label='참여하기'
            onClick={handleJoin}
            className='mb-normal-spacing'
          />
        )}
      </>
    );
  }

  return (
    <Button
      label='매칭이 종료되었어요'
      disabled
      className='mb-normal-spacing'
    />
  );
}
