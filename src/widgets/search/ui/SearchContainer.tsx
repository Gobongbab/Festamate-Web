import React from 'react';

import { FormItem } from '@/shared/ui';
import { POPULAR_KEYWORDS } from '@/widgets/search/model';

export default function SearchContainer() {
  return (
    <>
      <FormItem title='최근 검색어' childrenWrapper={false}>
        <div className='grid h-40 w-full place-items-center'>
          최근 검색어가 없습니다.
        </div>
      </FormItem>
      <FormItem title='인기 검색어' childrenWrapper={false}>
        <div className='flex h-fit w-full flex-wrap gap-2'>
          {POPULAR_KEYWORDS.map(keyword => (
            <span
              key={keyword}
              className='border-border h-fit rounded-lg border-[1px] px-4 py-2'
            >
              {keyword}
            </span>
          ))}
        </div>
      </FormItem>
    </>
  );
}
