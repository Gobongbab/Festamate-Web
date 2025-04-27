import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';

import { NormalAppBar } from '@/shared/ui';
import { CreateContainer } from '@/widgets/create/ui';
import { CreateProvider } from '@/widgets/create/model';

export default function CreateScreen() {
  return (
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen appBar={NormalAppBar('모임방 생성')}>
        <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-scroll overflow-y-scroll'>
          <CreateProvider>
            <CreateContainer />
          </CreateProvider>
        </div>
      </AppScreen>
    </div>
  );
}
