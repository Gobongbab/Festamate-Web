import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';

import { Dock, NormalAppBar } from '@/shared/ui';

export default function HomeScreen() {
  return (
    <>
      <AppScreen appBar={NormalAppBar('채팅')}>
        <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding pb-dock-height flex size-full flex-col overflow-scroll overflow-y-scroll'></div>
      </AppScreen>
      <Dock />
    </>
  );
}
