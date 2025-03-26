import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';

import { Appbar, Dock } from '@/shared/ui';
import { CreateContainer } from '@/widgets/create/ui';

export default function CreateScreen() {
  return (
    <AppScreen appBar={Appbar}>
      <div className='scrollbar-hide container-mobile flex size-full flex-col gap-y-6 overflow-scroll overflow-y-scroll p-6 pb-20'>
        <CreateContainer />
      </div>
      <Dock />
    </AppScreen>
  );
}
