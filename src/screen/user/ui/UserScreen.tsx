import { AppScreen } from '@stackflow/plugin-basic-ui';
import { NormalAppBar, Dock } from '@/shared/ui';
import { TermOfServiceModal, UserContainer } from '@/widgets/user/ui';

export default function UserScreen() {
  return (
    <>
      <AppScreen appBar={NormalAppBar('마이 페이지')}>
        <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding pb-dock-height flex size-full flex-col overflow-scroll overflow-y-scroll'>
          <UserContainer />
        </div>
      </AppScreen>
      <Dock />
      <TermOfServiceModal />
    </>
  );
}
