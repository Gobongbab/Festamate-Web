import { FiSearch } from 'react-icons/fi';
import { IoChevronBackSharp, IoTicket } from 'react-icons/io5';

import { HiOutlineDotsVertical } from 'react-icons/hi';

import { Input } from '@/shared/ui';
import { fetchLoginStatus } from '@festamate/utils';
import { type Dispatch, type SetStateAction, type FormEvent } from 'react';

const baseStyle = { height: '64px', backgroundColor: '#fff' };

export const AppBar = (
  searchOnClick: () => void,
  maximumTicket?: number,
  remainingTicket?: number,
  ticketOnClick?: () => void,
) => ({
  renderLeft: () => (
    <span className='agbalumo-regular logo ml-2'>Festamate!</span>
  ),
  renderRight: () => (
    <div className='flex items-center gap-3'>
      {fetchLoginStatus() && (
        <button
          onClick={ticketOnClick}
          name='ticketInfo'
          className='active:bg-border border-border bg-fill flex cursor-pointer items-center gap-2 rounded-full border-[1px] px-2 py-1 font-medium focus:outline-none'
        >
          <div>
            <IoTicket size={16} />
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-point'>{remainingTicket}</span>/
            <span>{maximumTicket}</span>
          </div>
        </button>
      )}
      <button
        name='search'
        className='mr-2 cursor-pointer'
        onClick={searchOnClick}
      >
        <FiSearch size={24} />
      </button>
    </div>
  ),
  closeButton: { renderIcon: () => <></> },
  ...baseStyle,
});

export const NormalAppBar = (title?: string) => ({
  title: title,
  ...baseStyle,
});

export const SearchAppBar = (
  closeOnClick: () => void,
  searchOnClick: (e: FormEvent) => void,
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
) => {
  const SearchAppBar = {
    renderLeft: () => (
      <form onSubmit={searchOnClick} className='flex items-center'>
        <IoChevronBackSharp size={24} onClick={closeOnClick} />
        <Input
          className='ml-3 w-[calc(100vw-128px)]'
          placeholder='검색어를 입력하세요'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    ),
    renderRight: () => (
      <FiSearch size={24} onClick={searchOnClick} className='mr-2' />
    ),
    ...baseStyle,
    backgroundColor: '#fff',
  };
  return SearchAppBar;
};

export const RoomAppBar = (menuOnClick: () => void) => ({
  renderRight: () => (
    <button onClick={menuOnClick} name='menu'>
      <HiOutlineDotsVertical size={22} />
    </button>
  ),
  ...baseStyle,
});
