import { FiSearch } from 'react-icons/fi';
import { IoChevronBackSharp, IoTicket } from 'react-icons/io5';

import { HiOutlineDotsVertical } from 'react-icons/hi';

import { Input } from '@/shared/ui';
import { fetchLoginStatus } from '@/shared/utils';

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
        <div className='border-border bg-fill flex items-center gap-2 rounded-full border-[1px] px-2 py-1 font-medium'>
          <button
            name='ticketInfo'
            className='hover:text-point cursor-pointer focus:outline-none'
            onClick={ticketOnClick}
          >
            <IoTicket size={16} />
          </button>
          <div className='flex items-center gap-1'>
            <span className='text-point'>{remainingTicket}</span>/
            <span>{maximumTicket}</span>
          </div>
        </div>
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
  searchOnClick: () => void,
) => ({
  renderLeft: () => (
    <>
      <IoChevronBackSharp size={24} onClick={closeOnClick} />
      <Input
        className='ml-3 w-[calc(100vw-128px)]'
        placeholder='검색어를 입력하세요'
      />
    </>
  ),
  renderRight: () => (
    <FiSearch size={24} onClick={searchOnClick} className='mr-2' />
  ),
  ...baseStyle,
  backgroundColor: '#fff',
});

export const RoomAppBar = (menuOnClick: () => void) => ({
  renderRight: () => (
    <button onClick={menuOnClick} name='menu'>
      <HiOutlineDotsVertical size={22} />
    </button>
  ),
  ...baseStyle,
});
