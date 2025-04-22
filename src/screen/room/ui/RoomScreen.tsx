import { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button, RoomAppBar } from '@/shared/ui';
import {
  MenuBottomSheet,
  RoomContainer,
  RoomJoinFriendModal,
  RoomJoinModal,
} from '@/widgets/room/ui';
import { RoomListItem } from '@/shared/types';
import { useBottomSheet, useModal } from '@/shared/hook';
import { BOTTOM_SHEET, MODAL } from '@/shared/constants';
import { fetchLoginStatus } from '@/shared/utils';

const RoomScreen: ActivityComponentType<RoomListItem> = ({
  params,
}: {
  params: RoomListItem;
}) => {
  const { openBottomSheet } = useBottomSheet();
  const { openModal } = useModal();
  const { maxParticipants, currentParticipants } = params;

  const isLogin = fetchLoginStatus();
  const availableFriendCnt = maxParticipants - currentParticipants - 1;
  const isAvailableWithFriend = maxParticipants - currentParticipants - 1 >= 1;

  const handleMenuClick = () => openBottomSheet(BOTTOM_SHEET.MENU);

  const handleJoin = () => {
    if (isLogin) openModal(MODAL.JOIN);
    else openBottomSheet(BOTTOM_SHEET.LOGIN);
  };
  const handleJoinWithFriend = () => {
    if (isLogin) openModal(MODAL.JOIN_WITH_FRIEND);
    else openBottomSheet(BOTTOM_SHEET.LOGIN);
  };

  return (
    <>
      <AppScreen appBar={RoomAppBar(handleMenuClick)}>
        <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-scroll overflow-y-scroll'>
          <RoomContainer {...params} />
        </div>
      </AppScreen>
      <div className='border-t-app-bar-border fixed bottom-0 z-30 flex h-fit w-full gap-x-3 border-[0.5px] bg-white px-6 py-6 text-lg font-semibold text-white'>
        <Button
          name='room-participate'
          label='참여하기'
          halfWidth={isAvailableWithFriend}
          onClick={handleJoin}
          className='mb-normal-spacing'
        />
        {isAvailableWithFriend && (
          <Button
            name='room-participate-with-friend'
            label='친구와 함께 참여하기'
            halfWidth
            onClick={handleJoinWithFriend}
            className='mb-normal-spacing'
          />
        )}
      </div>
      <MenuBottomSheet />
      <RoomJoinModal />
      <RoomJoinFriendModal availableFriendCnt={availableFriendCnt} />
    </>
  );
};

export default RoomScreen;
