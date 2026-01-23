import { ActivityComponentType, useStack } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { cn } from '@festamate/utils';

import { LoginBottomSheet } from '@/shared/ui';
import { RoomAppBar } from '@/widgets/menu-appbar';
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
  RoomActionButtons,
} from '@/screen/room/ui';
import { RoomListItem } from '@/shared/types';
import { useRoomActions } from '@/screen/room/model';

const RoomScreen: ActivityComponentType<RoomListItem> = ({
  params,
}: {
  params: RoomListItem;
}) => {
  const stack = useStack();
  const {
    status,
    setStatus,
    availableFriendCnt,
    handleMenuClick,
    handleJoin,
    handleJoinWithFriend,
    handleMoveToChat,
    actionButtonConfig,
    selectedUser,
  } = useRoomActions({ params });

  const { id, status: roomStatus, preferredGender } = params;
  const isLoading = stack.globalTransitionState === 'loading';

  return (
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen appBar={RoomAppBar({ menuOnClick: handleMenuClick })}>
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
        <RoomActionButtons
          actionButtonConfig={actionButtonConfig}
          handleJoin={handleJoin}
          handleJoinWithFriend={handleJoinWithFriend}
          handleMoveToChat={handleMoveToChat}
        />
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
