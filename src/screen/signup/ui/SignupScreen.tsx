import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';
import { NormalAppBar } from '@/shared/ui';

export default function ListScreen() {
  return (
    <AppScreen appBar={NormalAppBar('회원 가입')}>
      <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-y-scroll'></div>
    </AppScreen>
  );
}
