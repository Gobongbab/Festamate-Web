import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';

import { AppBar, Dock } from '@/shared/ui';
import { HomeContainer } from '@/widgets/home/ui';
import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';

export default function HomeScreen() {
  const { replace } = useFlow();
  const searchOnClick = () => replace(PATH.SEARCH, {});

  return (
    <AppScreen appBar={AppBar(searchOnClick)}>
      <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding pb-dock-height flex size-full flex-col overflow-scroll overflow-y-scroll'>
        <HomeContainer />
      </div>
      <Dock />
    </AppScreen>
  );
}
