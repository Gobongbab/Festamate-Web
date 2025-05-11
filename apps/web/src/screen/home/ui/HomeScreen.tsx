import React from 'react';
import { useAtomValue } from 'jotai';

import { AppScreen } from '@stackflow/plugin-basic-ui';
import { fetchLoginStatus } from '@festamate/utils';
import { MdAdd } from 'react-icons/md';

import { useFlow } from '@/app/stackflow';

import { AppBar, Button, Dock, LoginBottomSheet } from '@/shared/ui';
import { BOTTOM_SHEET, MODAL, PATH } from '@/shared/constants';
import { useBottomSheet, useModal } from '@/shared/hook';
import { userAtom } from '@/shared/atom';

import { HomeContainer, TicketInfoModal } from '@/widgets/home/ui';
import { useStack } from '@stackflow/react';

export default function HomeScreen() {
  const { openBottomSheet } = useBottomSheet();
  const { openModal } = useModal();
  const { replace, push } = useFlow();
  const isLogin = fetchLoginStatus();
  const stack = useStack();
  const user = useAtomValue(userAtom);
  const isLoading = stack.globalTransitionState === 'loading';

  const searchOnClick = () => replace(PATH.RESULT, { searchKey: '' });
  const ticketOnClick = () => openModal(MODAL.TICKET_INFO);
  const createOnClick = () => {
    if (isLogin) push(PATH.CREATE, {});
    else openBottomSheet(BOTTOM_SHEET.LOGIN);
  };

  return (
    <div className='touch-action-none fixed inset-0 overflow-hidden overflow-x-hidden'>
      <AppScreen
        appBar={AppBar(
          searchOnClick,
          user?.maximumTicket,
          user?.remainingTicket,
          ticketOnClick,
        )}
      >
        <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding pb-dock-height flex size-full flex-col overflow-scroll overflow-y-scroll'>
          <HomeContainer />
        </div>
        <Button
          shadow
          name='create-group'
          size='lg'
          className='absolute right-6 bottom-26 z-30 flex w-fit items-center gap-x-2 rounded-full px-5'
          onClick={createOnClick}
          label={
            <>
              <MdAdd size={14} /> <span>모임 만들기</span>
            </>
          }
        />
      </AppScreen>
      <TicketInfoModal />
      <LoginBottomSheet />
      <Dock isLoading={isLoading} />
    </div>
  );
}
