import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow } from '@stackflow/react';

import { HomeScreen } from '@/screen/home';
import { UserScreen } from '@/screen/user';
import { CreateScreen } from '@/screen/create/ui';

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities: { HomeScreen, UserScreen, CreateScreen },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
  ],
  initialActivity: () => 'HomeScreen',
});
