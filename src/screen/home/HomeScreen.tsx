import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';

import { AppBar, Dock } from '@/shared/ui';
import { HomeContainer } from '@/widgets/home/ui';
import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';

export default function HomeScreen() {
  const { push } = useFlow();
  const searchOnClick = () => push(PATH.SEARCH, {});

  return (
    <AppScreen appBar={AppBar(searchOnClick)}>
      <div className='scrollbar-hide container-mobile flex size-full flex-col gap-y-6 overflow-scroll overflow-y-scroll p-6 pb-20'>
        <HomeContainer />
      </div>
      <Dock />
    </AppScreen>
  );
}
