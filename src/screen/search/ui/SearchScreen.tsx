import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';

import { SearchAppBar } from '@/shared/ui';
import { SearchContainer } from '@/widgets/search/ui';
import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';

export default function SearchScreen() {
  const { replace } = useFlow();
  const closeOnClick = () => replace(PATH.HOME, {});
  const searchOnClick = () => replace(PATH.RESULT, {}, { animate: false });

  return (
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen appBar={SearchAppBar(closeOnClick, searchOnClick)}>
        <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-scroll overflow-y-scroll'>
          <SearchContainer />
        </div>
      </AppScreen>
    </div>
  );
}
