import { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { NormalAppBar } from '@/shared/ui';
import { ListContainer } from '@/widgets/list/ui';

type ListScreenParams = {
  title: string;
};

const ListScreen: ActivityComponentType<ListScreenParams> = ({
  params,
}: {
  params: ListScreenParams;
}) => {
  return (
    <AppScreen appBar={NormalAppBar(params.title)}>
      <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding pb-dock-height flex size-full flex-col overflow-y-scroll'>
        <ListContainer />
      </div>
    </AppScreen>
  );
};

export default ListScreen;
