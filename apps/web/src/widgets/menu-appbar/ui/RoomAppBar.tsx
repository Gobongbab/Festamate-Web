import { HiOutlineDotsVertical } from 'react-icons/hi';

import { APPBAR_BASE_STYLE } from '../constants/styles';

interface RoomAppBarProps {
  menuOnClick: () => void;
}

export const RoomAppBar = ({ menuOnClick }: RoomAppBarProps) => ({
  renderRight: () => (
    <button onClick={menuOnClick} name='menu'>
      <HiOutlineDotsVertical size={22} />
    </button>
  ),
  ...APPBAR_BASE_STYLE,
});
