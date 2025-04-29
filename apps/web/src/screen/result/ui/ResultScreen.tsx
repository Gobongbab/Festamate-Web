import React from 'react';

import { AppScreen } from '@stackflow/plugin-basic-ui';
import { MdAdd } from 'react-icons/md';

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
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen appBar={SearchAppBar(closeOnClick, searchOnClick)}>
        <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-scroll overflow-y-scroll pb-24'>
          <ResultContainer searchKey='과팅' />
        </div>
        <button
          name='create-group'
          className='box-shadow-buttonLg hover:bg-primary-hover absolute right-6 bottom-26 z-30 flex w-fit flex-shrink-0 cursor-pointer items-center gap-x-2 rounded-full bg-[#775bf0] px-5 py-2.5 text-lg font-medium text-white'
          onClick={createOnClick}
        >
          <MdAdd size={14} /> 모임 만들기
        </button>
        <Dock />
      </AppScreen>
    </div>
  );
}
