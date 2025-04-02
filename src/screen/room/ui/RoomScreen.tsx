import { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { NormalAppBar } from '@/shared/ui';
import { RoomContainer } from '@/widgets/room/ui';

type RoomScreenParams = {
  title: string;
};

const RoomScreen: ActivityComponentType<RoomScreenParams> = ({
  params,
}: {
  params: RoomScreenParams;
}) => {
  return (
    <AppScreen appBar={NormalAppBar(params.title)}>
      <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-scroll overflow-y-scroll'>
        <RoomContainer />
      </div>
    </AppScreen>
  );
};

export default RoomScreen;
