import { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { NormalAppBar } from '@/widgets/menu-appbar';
import { RoomList } from '@/widgets/room-list';
import { useGetRooms } from '@/screen/list/api';

type ListScreenParams = {
  title: string;
  request: string;
};

const ListScreen: ActivityComponentType<ListScreenParams> = ({
  params,
}: {
  params: ListScreenParams;
}) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetRooms(params.request);

  return (
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen appBar={NormalAppBar(params.title)}>
        <div className='scrollbar-hide container-mobile p-normal-padding pb-dock-height flex size-full flex-col gap-y-1.5 overflow-y-scroll pt-0'>
          <RoomList
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            isError={isError}
            error={error}
            refetch={refetch}
          />
        </div>
      </AppScreen>
    </div>
  );
};

export default ListScreen;
