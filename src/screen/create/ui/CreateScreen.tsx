import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';

import { NormalAppBar } from '@/shared/ui';
import { CreateContainer } from '@/widgets/create/ui';

export default function CreateScreen() {
  return (
    <AppScreen appBar={NormalAppBar('모임방 생성')}>
      <div className='scrollbar-hide container-mobile flex size-full flex-col gap-y-6 overflow-scroll overflow-y-scroll p-6'>
        <CreateContainer />
      </div>
    </AppScreen>
  );
}
