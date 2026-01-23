import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAtomValue } from 'jotai';

import { fetchLoginStatus } from '@festamate/utils';
import { useBottomSheet, useModal } from '@/shared/hook';
import { BOTTOM_SHEET, MODAL } from '@/shared/constants';
import { RoomAuthority, RoomListItem } from '@/shared/types';
import { selectedUserAtom } from '@/shared/atom';

interface RoomStatus {
  status: 'pending' | 'success';
  data: RoomAuthority | null;
}

interface UseRoomActionsProps {
  params: RoomListItem;
}

export const useRoomActions = ({ params }: UseRoomActionsProps) => {
  const [status, setStatus] = useState<RoomStatus>({
    status: 'pending',
    data: null,
  });
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { openBottomSheet } = useBottomSheet();
  const { openModal } = useModal();
  const selectedUser = useAtomValue(selectedUserAtom);

  const { maxParticipants, status: roomStatus, openChatUrl } = params;

  useEffect(() => {
    setIsLogin(fetchLoginStatus());
  }, []);

  const availableFriendCnt = useMemo(
    () => maxParticipants / 2 - 1,
    [maxParticipants],
  );

  const isAvailableWithFriend = useMemo(
    () => maxParticipants !== 2,
    [maxParticipants],
  );

  const handleMenuClick = useCallback(() => {
    if (status.status === 'success') openBottomSheet(BOTTOM_SHEET.MENU);
  }, [status.status, openBottomSheet]);

  const handleJoin = useCallback(() => {
    if (isLogin) openModal(MODAL.JOIN);
    else openBottomSheet(BOTTOM_SHEET.LOGIN);
  }, [isLogin, openModal, openBottomSheet]);

  const handleJoinWithFriend = useCallback(() => {
    if (isLogin) openModal(MODAL.JOIN_WITH_FRIEND);
    else openBottomSheet(BOTTOM_SHEET.LOGIN);
  }, [isLogin, openModal, openBottomSheet]);

  const handleMoveToChat = useCallback(() => {
    window.open(openChatUrl, '_blank');
  }, [openChatUrl]);

  const actionButtonConfig = useMemo(() => {
    if (isLogin && status.status === 'pending') {
      return {
        type: 'join' as const,
        withFriend: isAvailableWithFriend,
      };
    }

    if (isLogin && status.data === 'HOST') {
      return {
        type: 'host-chat' as const,
      };
    }

    if (isLogin && status.data === 'PARTICIPANT') {
      return {
        type: 'participant-chat' as const,
      };
    }

    const buttonType = roomStatus === 'MATCHING' ? 'guest-join' : 'closed';
    return {
      type: buttonType as 'guest-join' | 'closed',
      withFriend: isAvailableWithFriend,
    };
  }, [isLogin, status, roomStatus, isAvailableWithFriend]);

  return {
    status,
    setStatus,
    isLogin,
    availableFriendCnt,
    isAvailableWithFriend,
    handleMenuClick,
    handleJoin,
    handleJoinWithFriend,
    handleMoveToChat,
    actionButtonConfig,
    selectedUser,
  };
};
