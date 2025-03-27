import { AppScreen } from '@stackflow/plugin-basic-ui';
import { NormalAppBar, Dock } from '@/shared/ui';
import { UserContainer } from '@/widgets/user/ui';

export default function UserScreen() {
  return (
    <AppScreen appBar={NormalAppBar('마이 페이지')}>
      <div className='scrollbar-hide container-mobile flex size-full flex-col gap-y-6 overflow-scroll overflow-y-scroll p-6 pb-19'>
        <UserContainer />
      </div>
      <Dock />
    </AppScreen>
  );
}
