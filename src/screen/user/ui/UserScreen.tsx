import { AppScreen } from '@stackflow/plugin-basic-ui';
import { NormalAppBar, Dock } from '@/shared/ui';
import {
  TermOfServiceModal,
  UserContainer,
  NotificationSettingModal,
  TicketRegisterModal,
} from '@/widgets/user/ui';

export default function UserScreen() {
  return (
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen appBar={NormalAppBar('마이 페이지')}>
        <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding pb-dock-height flex size-full flex-col overflow-scroll overflow-y-scroll'>
          <UserContainer />
        </div>
      </AppScreen>
      <Dock />
      <TermOfServiceModal />
      <NotificationSettingModal />
      <TicketRegisterModal />
    </div>
  );
}
