import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';
import { SearchAppBar, Dock } from '@/shared/ui';
import { ResultContainer } from '@/widgets/result/ui';

export default function ResultScreen() {
  const { replace } = useFlow();
  const onClick = () => replace(PATH.RESULT, {}, { animate: false });

  return (
    <AppScreen appBar={SearchAppBar(onClick)}>
      <div className='scrollbar-hide container-mobile flex size-full flex-col gap-y-6 overflow-scroll overflow-y-scroll p-6 pb-24'>
        <ResultContainer searchKey='과팅' />
      </div>
      <Dock />
    </AppScreen>
  );
}
