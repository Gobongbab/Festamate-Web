import React, { useState } from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';
import { MdAdd } from 'react-icons/md';

import { AppBar, Dock, LoginBottomSheet } from '@/shared/ui';
import { HomeContainer } from '@/widgets/home/ui';
import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';

export default function HomeScreen() {
  const hasToken = false;
  const [isOpen, setIsOpen] = useState(false);
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
        <button
          name='create-group'
          className='box-shadow-buttonLg hover:bg-primary-hover absolute right-6 bottom-26 z-30 flex w-fit flex-shrink-0 cursor-pointer items-center gap-x-2 rounded-full bg-[#775bf0] px-5 py-2.5 text-lg font-medium text-white'
          onClick={createOnClick}
        >
          <MdAdd size={14} /> 모임방 만들기
        </button>
      </AppScreen>
      <LoginBottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => setIsOpen(false)}
      />
      <Dock />
    </>
  );
}
