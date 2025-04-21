import { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { RoomAppBar } from '@/shared/ui';
import { MenuBottomSheet, RoomContainer } from '@/widgets/room/ui';
import { RoomListItem } from '@/shared/types';
import { useBottomSheet } from '@/shared/hook';
import { BOTTOM_SHEET } from '@/shared/constants';

const RoomScreen: ActivityComponentType<RoomListItem> = ({
  params,
}: {
  params: RoomListItem;
}) => {
  const { openBottomSheet } = useBottomSheet();
  const handleMenuClick = () => openBottomSheet(BOTTOM_SHEET.MENU);

  return (
    <>
      <AppScreen appBar={RoomAppBar(handleMenuClick)}>
        <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-scroll overflow-y-scroll'>
          <RoomContainer {...params} />
        </div>
      </AppScreen>
      <MenuBottomSheet />
    </>
  );
};

export default RoomScreen;
