import { FiSearch } from 'react-icons/fi';
import { IoChevronBackSharp } from 'react-icons/io5';
import { HiOutlineDotsVertical } from 'react-icons/hi';

import Input from './Input';

const baseStyle = { height: '64px', backgroundColor: '#fff' };

export const AppBar = (searchOnClick: () => void) => ({
  renderLeft: () => (
    <span className='agbalumo-regular logo ml-2'>Festamate!</span>
  ),
  renderRight: () => (
    <button
      name='search'
      className='mr-2 cursor-pointer'
      onClick={searchOnClick}
    >
      <FiSearch size={24} />
    </button>
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
  closeButton: { renderIcon: () => <></> },
  ...baseStyle,
});
