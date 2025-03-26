import React from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { AppBar, Dock } from '@/shared/ui';
import { HomeContainer } from '@/widgets/home/ui';

export default function HomeScreen() {
  return (
    <AppScreen appBar={AppBar()}>
      <div className='scrollbar-hide container-mobile flex size-full flex-col gap-y-6 overflow-scroll overflow-y-scroll p-6 pb-20'>
        <HomeContainer />
      </div>
      <Dock />
    </AppScreen>
  );
}
