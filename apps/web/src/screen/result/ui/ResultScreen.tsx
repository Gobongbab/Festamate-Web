import React, { type FormEvent } from 'react';
import { useAtom } from 'jotai';

import { AppScreen } from '@stackflow/plugin-basic-ui';
import { type ActivityComponentType } from '@stackflow/react';
import { MdAdd } from 'react-icons/md';

import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';
import { searchAtom } from '@/shared/atom';
import { SearchAppBar, Dock } from '@/shared/ui';

import { useRecentSearches } from '@/widgets/search/model';
import { ResultContainer } from '@/widgets/result/ui';

const ResultScreen: ActivityComponentType<{ searchKey: string }> = ({
  params,
}: {
  params: { searchKey: string };
}) => {
  const [value, setValue] = useAtom(searchAtom);
  const { addSearch } = useRecentSearches();
  const { replace, push } = useFlow();

  const closeOnClick = () => replace(PATH.HOME, {});
  const searchOnClick = (e: FormEvent) => {
    e.preventDefault();
    addSearch(value);
    replace(PATH.RESULT, { searchKey: value }, { animate: false });
  };
  const createOnClick = () => push(PATH.CREATE, {});

  return (
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen
        appBar={SearchAppBar(closeOnClick, searchOnClick, value, setValue)}
      >
        <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-scroll overflow-y-scroll pb-24'>
          <ResultContainer searchKey={params.searchKey} />
        </div>
        <button
          name='create-group'
          className='box-shadow-buttonLg hover:bg-primary-hover absolute right-6 bottom-18 z-30 flex w-fit flex-shrink-0 cursor-pointer items-center gap-x-2 rounded-full bg-[#775bf0] px-5 py-2.5 text-lg font-medium text-white'
          onClick={createOnClick}
        >
          <MdAdd size={14} /> 모임 만들기
        </button>
        <Dock />
      </AppScreen>
    </div>
  );
};

export default ResultScreen;
