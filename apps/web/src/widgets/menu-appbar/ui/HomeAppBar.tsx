import { IoTicket, IoSearch } from 'react-icons/io5';

import { fetchLoginStatus } from '@festamate/utils';
import { APPBAR_BASE_STYLE } from '../constants/styles';

interface HomeAppBarProps {
  searchOnClick: () => void;
  maximumTicket?: number;
  remainingTicket?: number;
  ticketOnClick?: () => void;
}

export const HomeAppBar = ({
  searchOnClick,
  maximumTicket,
  remainingTicket,
  ticketOnClick,
}: HomeAppBarProps) => ({
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
        <IoSearch size={24} />
      </button>
    </div>
  ),
  closeButton: { renderIcon: () => <></> },
  ...APPBAR_BASE_STYLE,
});
