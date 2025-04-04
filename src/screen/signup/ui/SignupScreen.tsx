import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';
import { NormalAppBar } from '@/shared/ui';
import { SignupContainer } from '@/widgets/signup/ui';

export default function ListScreen() {
  return (
    <AppScreen appBar={NormalAppBar('회원 가입')}>
      <div className='scrollbar-hide container-mobile flex size-full flex-col overflow-y-scroll'>
        <SignupContainer />
      </div>
    </AppScreen>
  );
}
