import React from 'react';

import { useFlow } from '@/app/stackflow';
import { useSetAtom } from 'jotai';

import { FormItem } from '@/shared/ui';
import { useRecentSearches } from '@/widgets/search/model';
import { PATH } from '@/shared/constants';
import { searchAtom } from '@/shared/atom';

export default function SearchContainer() {
  const setValue = useSetAtom(searchAtom);
  const { recentSearches, removeSearch, clearSearches } = useRecentSearches();
  const { replace } = useFlow();

  const keywordOnClick = (keyword: string) => {
    setValue(keyword);
    replace(PATH.RESULT, { searchKey: keyword }, { animate: false });
  };

  return (
    <FormItem title='최근 검색어'>
      {recentSearches.length === 0 ? (
        <div className='grid h-40 w-full place-items-center'>
          최근 검색어가 없습니다.
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          <div className='flex h-fit w-full flex-wrap gap-2'>
            {recentSearches.map(keyword => (
              <button
                name={keyword}
                className='border-border flex items-center gap-2 rounded-lg border-[1px] px-4 py-2'
                onClick={() => keywordOnClick(keyword)}
              >
                <span>{keyword}</span>
                <button
                  onClick={() => removeSearch(keyword)}
                  className='text-gray-400 hover:text-gray-600'
                >
                  x
                </button>
              </button>
            ))}
          </div>
          <button
            onClick={clearSearches}
            className='text-light active:text-dark text-sm'
          >
            전체 삭제
          </button>
        </div>
      )}
    </FormItem>
  );
}
