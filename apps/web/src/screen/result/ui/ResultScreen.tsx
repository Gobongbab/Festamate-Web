import React, { useState, type FormEvent } from 'react';
import { useAtom } from 'jotai';

import { AppScreen } from '@stackflow/plugin-basic-ui';
import { type ActivityComponentType } from '@stackflow/react';
import { MdAdd } from 'react-icons/md';

import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';
import { searchAtom } from '@/shared/atom';
import { SearchAppBar, Dock, Button } from '@/shared/ui';

import { useRecentSearches } from '@/widgets/search/model';
import { FilterBottomSheet, ResultContainer } from '@/widgets/result/ui';
import { Filter } from '@/widgets/result/types';

const ResultScreen: ActivityComponentType<{ searchKey: string }> = ({
  params,
}: {
  params: { searchKey: string };
}) => {
  const [value, setValue] = useAtom(searchAtom);
  const [filter, setFilter] = useState<Filter>({});
  const { addSearch } = useRecentSearches();
  const { replace, push } = useFlow();

  const closeOnClick = () => replace(PATH.HOME, {});
  const searchOnClick = (e: FormEvent) => {
    e.preventDefault();
    if (value.length > 0) {
      addSearch(value);
      replace(PATH.RESULT, { searchKey: value }, { animate: false });
    }
  };
  const createOnClick = () => push(PATH.CREATE, {});

  return (
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen
        appBar={SearchAppBar(closeOnClick, searchOnClick, value, setValue)}
      >
        <div className='scrollbar-hide container-mobile p-normal-padding flex size-full flex-col gap-y-2 overflow-scroll overflow-y-scroll pb-24'>
          <ResultContainer searchKey={params.searchKey} filter={filter} />
        </div>
        <Button
          shadow
          name='create-group'
          size='md'
          className='absolute right-6 bottom-18 z-30 flex w-fit items-center gap-x-2 rounded-full px-5'
          onClick={createOnClick}
          label={
            <>
              <MdAdd size={14} /> <span>모임 만들기</span>
            </>
          }
        />
        <Dock />
      </AppScreen>
      <FilterBottomSheet setFilter={setFilter} />
    </div>
  );
};

export default ResultScreen;
