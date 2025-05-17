import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';

import { NormalAppBar } from '@/shared/ui';
import {
  EditContainer,
  DatePickBottomSheet,
  OpenChatGuideModal,
  TimePickBottomSheet,
} from '@/widgets/edit/ui';
import { EditProvider } from '@/widgets/edit/model';
import { ActivityComponentType } from '@stackflow/react';
import { RoomListItem } from '@/shared/types';

const EditScreen: ActivityComponentType<{ initialData: RoomListItem }> = ({
  params,
}: {
  params: { initialData: RoomListItem };
}) => {
  return (
    <EditProvider initialData={params.initialData}>
      <div className='fixed inset-0 overflow-hidden'>
        <AppScreen appBar={NormalAppBar('모임 수정')}>
          <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-scroll overflow-y-scroll'>
            <EditContainer {...params.initialData} />
          </div>
        </AppScreen>
        <OpenChatGuideModal />
        <DatePickBottomSheet />
        <TimePickBottomSheet />
      </div>
    </EditProvider>
  );
};

export default EditScreen;
