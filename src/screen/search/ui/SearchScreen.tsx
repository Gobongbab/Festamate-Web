import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';

import { SearchAppBar } from '@/shared/ui';

export default function SearchScreen() {
  return (
    <AppScreen appBar={SearchAppBar()}>
      <div className='scrollbar-hide container-mobile flex size-full flex-col gap-y-6 overflow-scroll overflow-y-scroll p-6'></div>
    </AppScreen>
  );
}
