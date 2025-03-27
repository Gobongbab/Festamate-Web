import { FiSearch } from 'react-icons/fi';
import Input from './Input';

const baseStyle = { height: '64px', backgroundColor: '#f4f4f4' };

export const AppBar = (searchOnClick: () => void) => ({
  renderLeft: () => (
    <span className='agbalumo-regular ml-2 text-lg font-bold'>Festamate!</span>
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
  ...baseStyle,
});

export const NormalAppBar = (title?: string) => ({
  title: title,
  ...baseStyle,
});

export const SearchAppBar = () => ({
  renderLeft: () => (
    <div className='flex size-full items-center'>
      <Input className='mx-6 w-[265px]' placeholder='검색어를 입력하세요' />
      <FiSearch size={24} />
    </div>
  ),

  ...baseStyle,
  backgroundColor: '#fff',
});
