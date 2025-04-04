import React from 'react';

import { NormalAppBar } from '@/shared/ui';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { LoginContainer } from '@/widgets/login/ui';

export default function LoginScreen() {
  return (
    <AppScreen appBar={NormalAppBar()}>
      <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-y-scroll'>
        <LoginContainer />
      </div>
    </AppScreen>
  );
}
