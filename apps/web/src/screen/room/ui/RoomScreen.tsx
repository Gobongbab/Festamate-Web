import { useState, useEffect } from 'react';

import { ActivityComponentType, useStack } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { cn, fetchLoginStatus } from '@festamate/utils';

import { Button, LoginBottomSheet, RoomAppBar } from '@/shared/ui';
import {
  MenuBottomSheet,
  RoomContainer,
  RoomDeleteDenialModal,
  RoomDeleteModal,
  RoomJoinFriendModal,
  RoomJoinModal,
  RoomReportModal,
  UserManageBottomSheet,
  UserReportModal,
} from '@/widgets/room/ui';
import { RoomAuthority, RoomListItem } from '@/shared/types';
import { useBottomSheet, useModal } from '@/shared/hook';
import { BOTTOM_SHEET, MODAL, PATH } from '@/shared/constants';
// import { useLeaveRoom } from '@/widgets/room/api';
import { useAtomValue } from 'jotai';
import { selectedUserAtom } from '@/shared/atom';
import { useFlow } from '@/app/stackflow';

// 사용자 상태를 위한 타입 정의
type RoomStatus = {
  status: 'pending' | 'success';
  data: RoomAuthority | null;
};

const RoomScreen: ActivityComponentType<RoomListItem> = ({
  params,
}: {
  params: RoomListItem;
}) => {
  const [status, setStatus] = useState<RoomStatus>({
    status: 'pending',
    data: null,
  });
  const stack = useStack();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const {
    maxParticipants,
    id,
    status: roomStatus,
    openChatUrl,
    preferredGender,
  } = params;
  // const { mutate: leave } = useLeaveRoom(id);
  const { replace } = useFlow();
  const { openBottomSheet } = useBottomSheet();
  const { openModal } = useModal();
  const selectedUser = useAtomValue(selectedUserAtom);

  useEffect(() => {
    setIsLogin(fetchLoginStatus());
  }, []);

  const availableFriendCnt = maxParticipants / 2 - 1;
  const isAvailableWithFriend = maxParticipants !== 2;
  const isLoading = stack.globalTransitionState === 'loading';

  const handleCloseClick = () => replace(PATH.HOME, {});

  const handleMenuClick = () => {
    if (status.status === 'success') openBottomSheet(BOTTOM_SHEET.MENU);
  };

  const handleJoin = () => {
    if (isLogin) openModal(MODAL.JOIN);
    else openBottomSheet(BOTTOM_SHEET.LOGIN);
  };

  const handleJoinWithFriend = () => {
    if (isLogin) openModal(MODAL.JOIN_WITH_FRIEND);
    else openBottomSheet(BOTTOM_SHEET.LOGIN);
  };

  const handleMoveToChat = () => {
    window.open(openChatUrl, '_blank');
  };

  // const handleLeaveRoom = () => leave(id);

  const renderActionButtons = () => {
    if (isLogin && status.status === 'pending') {
      return (
        <>
          {isAvailableWithFriend ? (
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

    if (isLogin && status.data === 'HOST') {
      return (
        <Button
          name='room-chat'
          label='채팅방 이동'
          onClick={handleMoveToChat}
          className='mb-normal-spacing'
        />
      );
    }

    if (isLogin && status.data === 'PARTICIPANT') {
      return (
        <>
          <Button
            name='room-chat'
            label='오픈채팅방 이동'
            onClick={handleMoveToChat}
            className='mb-normal-spacing'
          />
          {/* <Button
            name='room-leave'
            label='방 나가기'
            halfWidth
            onClick={handleLeaveRoom}
            className='mb-normal-spacing'
          /> */}
        </>
      );
    }

    return (
      <>
        {roomStatus === 'MATCHING' ? (
          isAvailableWithFriend ? (
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
          )
        ) : (
          <Button
            label='매칭이 종료되었어요'
            disabled
            className='mb-normal-spacing'
          />
        )}
      </>
    );
  };

  return (
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen appBar={RoomAppBar(handleCloseClick, handleMenuClick)}>
        <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-scroll overflow-y-scroll'>
          <RoomContainer {...params} setStatus={setStatus} />
        </div>
      </AppScreen>
      <div
        className={cn(
          'border-t-app-bar-border fixed bottom-0 z-30 flex h-fit w-full gap-x-3 border-[0.5px] bg-white px-6 py-6 text-lg font-semibold text-white transition-transform duration-300',
          isLoading ? 'translate-y-full' : 'translate-y-0',
        )}
      >
        {renderActionButtons()}
      </div>
      <LoginBottomSheet />
      <UserManageBottomSheet />
      <MenuBottomSheet
        roomAuthority={status.data}
        roomStatus={roomStatus}
        roomData={params}
      />
      <RoomDeleteModal roomId={id} />
      <RoomDeleteDenialModal />
      <RoomJoinModal roomId={id} />
      <RoomReportModal roomId={id} />
      <UserReportModal userId={selectedUser} />
      <RoomJoinFriendModal
        availableFriendCnt={availableFriendCnt}
        preferredGender={preferredGender}
        roomId={id}
      />
    </div>
  );
};

export default RoomScreen;
