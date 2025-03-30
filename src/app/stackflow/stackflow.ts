import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow } from '@stackflow/react';

import { HomeScreen } from '@/screen/home';
import { UserScreen } from '@/screen/user';
import { CreateScreen } from '@/screen/create/ui';
import { SearchScreen } from '@/screen/search/ui';
import { ResultScreen } from '@/screen/result/ui';
import { ListScreen } from '@/screen/list/ui';

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    HomeScreen,
    UserScreen,
    CreateScreen,
    SearchScreen,
    ResultScreen,
    ListScreen,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
  ],
  initialActivity: () => 'HomeScreen',
});
