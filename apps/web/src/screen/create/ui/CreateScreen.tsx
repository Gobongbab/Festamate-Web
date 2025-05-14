import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';

import { NormalAppBar } from '@/shared/ui';
import {
  CreateContainer,
  DatePickBottomSheet,
  OpenChatGuideModal,
  TimePickBottomSheet,
} from '@/widgets/create/ui';
import { CreateProvider } from '@/widgets/create/model';

export default function CreateScreen() {
  return (
    <CreateProvider>
      <div className='fixed inset-0 overflow-hidden'>
        <AppScreen appBar={NormalAppBar('모임 생성')}>
          <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-scroll overflow-y-scroll'>
            <CreateContainer />
          </div>
        </AppScreen>
        <OpenChatGuideModal />
        <DatePickBottomSheet />
        <TimePickBottomSheet />
      </div>
    </CreateProvider>
  );
}
