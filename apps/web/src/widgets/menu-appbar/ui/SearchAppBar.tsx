import { IoSearch } from 'react-icons/io5';
import { IoIosArrowBack } from 'react-icons/io';
import { type Dispatch, type SetStateAction, type FormEvent } from 'react';

import { Input } from '@/shared/ui';
import { APPBAR_BASE_STYLE } from '../constants/styles';

interface SearchAppBarProps {
  closeOnClick: () => void;
  searchOnClick: (e: FormEvent) => void;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const SearchAppBar = ({
  closeOnClick,
  searchOnClick,
  value,
  setValue,
}: SearchAppBarProps) => ({
  renderLeft: () => (
    <form onSubmit={searchOnClick} className='flex items-center'>
      <IoIosArrowBack size={24} onClick={closeOnClick} />
      <Input
        className='ml-3 w-[calc(100vw-128px)]'
        placeholder='검색어를 입력하세요'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  ),
  renderRight: () => (
    <IoSearch size={24} onClick={searchOnClick} className='mr-2' />
  ),
  ...APPBAR_BASE_STYLE,
  backgroundColor: '#fff',
});
