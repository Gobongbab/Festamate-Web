import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow } from '@stackflow/react';

import { HomeScreen } from '@/screen/home/ui';
import { UserScreen } from '@/screen/user/ui';
import { CreateScreen } from '@/screen/create/ui';
import { ResultScreen } from '@/screen/result/ui';
import { ListScreen } from '@/screen/list/ui';
import { RoomScreen } from '@/screen/room/ui';
import { ChatListScreen, ChatScreen } from '@/screen/chat/ui';
import { EditScreen } from '@/screen/edit/ui';

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    HomeScreen,
    UserScreen,
    CreateScreen,
    ResultScreen,
    ListScreen,
    RoomScreen,
    ChatListScreen,
    ChatScreen,
    EditScreen,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
  ],
  initialActivity: () => 'HomeScreen',
});
