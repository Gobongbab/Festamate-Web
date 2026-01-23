import { useInfiniteQuery } from '@tanstack/react-query';

import { get, REQUEST } from '@/shared/api';
import type { RoomListItem, BasePagedResponse } from '@/shared/types';
import type { Filter } from '@/screen/search/types';

interface GetSearchResultsProps {
  pageParam: number;
  filter?: Filter;
  keyword: string;
}

const getSearchResults = async ({
  pageParam = 0,
  filter,
  keyword,
}: GetSearchResultsProps) => {
  const response = await get<BasePagedResponse<RoomListItem>>({
    request: REQUEST.ROOM,
    params: {
      page: pageParam,
      size: 20,
      keyword: keyword,
      ...filter,
    },
  });
  return response.data.result;
};

export const useGetSearchResults = (
  keyword: string,
  filter?: GetSearchResultsProps['filter'],
) => {
  return useInfiniteQuery({
    queryKey: ['rooms', filter],
    queryFn: ({ pageParam }) =>
      getSearchResults({ pageParam, filter, keyword }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage.last || lastPage.empty) return undefined;
      return lastPage.pageable.pageNumber + 1;
    },
  });
};
