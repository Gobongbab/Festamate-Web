import React, { useEffect, type FormEvent } from 'react';
import { useAtom } from 'jotai';

import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useFlow } from '@/app/stackflow';

import { SearchAppBar } from '@/shared/ui';
import { PATH } from '@/shared/constants';
import { searchAtom } from '@/shared/atom';
import { SearchContainer } from '@/widgets/search/ui';
import { useRecentSearches } from '@/widgets/search/model';

export default function SearchScreen() {
  const [value, setValue] = useAtom(searchAtom);
  const { addSearch } = useRecentSearches();

  const { replace } = useFlow();
  const closeOnClick = () => replace(PATH.HOME, {});
  const searchOnClick = (e: FormEvent) => {
    e.preventDefault();
    addSearch(value);
    replace(PATH.RESULT, { searchKey: value }, { animate: false });
  };

  useEffect(() => {
    setValue('');
  }, [setValue]);

  return (
    <div className='fixed inset-0 overflow-hidden'>
      <AppScreen
        appBar={SearchAppBar(closeOnClick, searchOnClick, value, setValue)}
      >
        <div className='scrollbar-hide container-mobile gap-y-normal-spacing p-normal-padding flex size-full flex-col overflow-scroll overflow-y-scroll'>
          <SearchContainer />
        </div>
      </AppScreen>
    </div>
  );
}
