import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';
import { SearchAppBar, Dock } from '@/shared/ui';
import { ResultContainer } from '@/widgets/result/ui';

export default function ResultScreen() {
  const { replace, push } = useFlow();
  const closeOnClick = () => replace(PATH.HOME, {});
  const searchOnClick = () => replace(PATH.RESULT, {}, { animate: false });
  const createOnClick = () => push(PATH.CREATE, {});

  return (
    <AppScreen appBar={SearchAppBar(closeOnClick, searchOnClick)}>
      <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-scroll overflow-y-scroll pb-24'>
        <ResultContainer searchKey='과팅' />
      </div>
      <button
        name='create-group'
        className='box-shadow-buttonLg rounded-10 text-md hover:bg-primary-hover absolute right-6 bottom-24 z-30 w-fit flex-shrink-0 cursor-pointer bg-[#775bf0] px-4 py-2 font-semibold text-white'
        onClick={createOnClick}
      >
        +
      </button>
      <Dock />
    </AppScreen>
  );
}
