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
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen appBar={NormalAppBar(params.title)}>
        <div className='scrollbar-hide container-mobile p-normal-padding pb-dock-height flex size-full flex-col gap-y-1.5 overflow-y-scroll'>
          <ListContainer />
        </div>
      </AppScreen>
    </div>
  );
};

export default ListScreen;
