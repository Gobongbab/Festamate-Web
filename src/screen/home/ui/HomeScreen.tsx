import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';
import { MdAdd } from 'react-icons/md';

import { useFlow } from '@/app/stackflow';

import { AppBar, Button, Dock, LoginBottomSheet } from '@/shared/ui';
import { BOTTOM_SHEET, PATH } from '@/shared/constants';
import { fetchLoginStatus } from '@/shared/utils';
import { useBottomSheet } from '@/shared/hook';

import { HomeContainer } from '@/widgets/home/ui';
import { useStack } from '@stackflow/react';

export default function HomeScreen() {
  const { openBottomSheet } = useBottomSheet();
  const { replace, push } = useFlow();
  const isLogin = fetchLoginStatus();
  const stack = useStack();
  const isLoading = stack.globalTransitionState === 'loading';

  const searchOnClick = () => replace(PATH.SEARCH, {});
  const createOnClick = () => {
    if (isLogin) push(PATH.CREATE, {});
    else openBottomSheet(BOTTOM_SHEET.LOGIN);
  };

  return (
    <>
      <AppScreen appBar={AppBar(searchOnClick)}>
        <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding pb-dock-height flex size-full flex-col overflow-scroll overflow-y-scroll'>
          <HomeContainer />
        </div>
        <Button
          shadow
          name='create-group'
          size='md'
          className='absolute right-6 bottom-26 z-30 flex w-fit items-center gap-x-2 rounded-full px-5'
          onClick={createOnClick}
          label={
            <>
              <MdAdd size={14} /> <span>모임방 만들기</span>
            </>
          }
        />
      </AppScreen>
      <LoginBottomSheet />
      <Dock isLoading={isLoading} />
    </>
  );
}
