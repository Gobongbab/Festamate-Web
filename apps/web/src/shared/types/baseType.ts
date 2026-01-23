/**
 * 정렬 정보를 나타내는 타입
 */
export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

/**
 * 페이지 정보를 나타내는 타입
 */
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

/**
 * 페이지네이션된 응답의 기본 구조
 * @template T - content 배열의 요소 타입
 */
export interface PagedContent<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

/**
 * API 페이지네이션 응답의 기본 구조 (result 래핑)
 * @template T - content 배열의 요소 타입
 */
export interface BasePagedResponse<T> {
  result: PagedContent<T>;
}

/**
 * API 응답의 기본 구조 (isSuccess, message 포함)
 * @template T - content 배열의 요소 타입
 */
export interface BaseApiPagedResponse<T> {
  isSuccess: boolean;
  message: string;
  result: PagedContent<T>;
}
