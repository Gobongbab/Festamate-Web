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
    <AppScreen appBar={SearchAppBar(closeOnClick, searchOnClick)}>
      <div className='scrollbar-hide container-mobile flex size-full flex-col gap-y-6 overflow-scroll overflow-y-scroll p-6'>
        <SearchContainer />
      </div>
    </AppScreen>
  );
}
