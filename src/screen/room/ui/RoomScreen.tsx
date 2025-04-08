import { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { NormalAppBar } from '@/shared/ui';
import { RoomContainer } from '@/widgets/room/ui';
import { RoomListItem } from '@/shared/types';

const RoomScreen: ActivityComponentType<RoomListItem> = ({
  params,
}: {
  params: RoomListItem;
}) => {
  return (
    <AppScreen appBar={NormalAppBar('모임방 상세')}>
      <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-scroll overflow-y-scroll'>
        <RoomContainer {...params} />
      </div>
    </AppScreen>
  );
};

export default RoomScreen;
