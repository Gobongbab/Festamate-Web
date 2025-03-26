import { AppScreen } from '@stackflow/plugin-basic-ui';
import { AppBar, Dock } from '@/shared/ui';
import { UserContainer } from '@/widgets/user/ui';

export default function UserScreen() {
  return (
    <AppScreen appBar={AppBar()}>
      <div className='scrollbar-hide container-mobile flex size-full flex-col gap-y-6 overflow-scroll overflow-y-scroll p-6 pb-19'>
        <UserContainer />
      </div>
      <Dock />
    </AppScreen>
  );
}
