import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';
import { MdAdd } from 'react-icons/md';

import { AppBar, Button, Dock, LoginBottomSheet } from '@/shared/ui';
import { HomeContainer } from '@/widgets/home/ui';
import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';
import { fetchLoginStatus } from '@/shared/utils';
import { useSetAtom } from 'jotai';
import { bottomSheetAtom } from '@/shared/atom';

export default function HomeScreen() {
  const hasToken = fetchLoginStatus();
  const setIsOpen = useSetAtom(bottomSheetAtom);
  const { replace, push } = useFlow();

  const searchOnClick = () => replace(PATH.SEARCH, {});
  const createOnClick = () => {
    if (hasToken) push(PATH.CREATE, {});
    else setIsOpen(true);
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
      <Dock />
    </>
  );
}
