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
      <button
        name='create-group'
        className='box-shadow-buttonLg rounded-10 text-md hover:bg-primary-hover absolute right-6 bottom-24 z-30 w-fit flex-shrink-0 cursor-pointer bg-[#775bf0] px-4 py-2 font-semibold text-white'
        onClick={onClick}
      >
        +
      </button>
      <Dock />
    </AppScreen>
  );
}
