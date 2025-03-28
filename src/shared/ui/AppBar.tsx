import { FiChevronLeft, FiSearch } from 'react-icons/fi';
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
      <FiChevronLeft size={32} onClick={closeOnClick} />
      <Input
        className='ml-3 w-[calc(100vw-132px)]'
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
