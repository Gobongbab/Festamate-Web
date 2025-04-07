import React, { forwardRef } from 'react';

import { RiUser3Fill } from 'react-icons/ri';

import { useFlow } from '@/app/stackflow';
import { PATH } from '@/shared/constants';

interface ListItemProps {
  title: string;
}

const ListItem = forwardRef<HTMLButtonElement, ListItemProps>(
  function ListItem(props, ref) {
    const { push } = useFlow();
    const { title } = props;

    const handleClick = () => {
      push(PATH.ROOM, { title: '모임방 상세' });
    };

    return (
      <button
        name='listitem'
        className='border-border rounded-10 grid h-30 w-full cursor-pointer grid-cols-[1fr_4fr] gap-3 py-3 focus:outline-none'
        onClick={handleClick}
        ref={ref}
      >
        <div className='rounded-5 h-full bg-red-500/10'></div>
        <div className='flex h-full flex-col justify-between overflow-hidden'>
          <div className='flex flex-col items-start'>
            <p className='text-lg font-semibold'>
              {title || '컴공 봄부스 같이가영'}
            </p>
            <p className='w-full overflow-hidden text-nowrap text-ellipsis'>
              컴공 봄부스에서 닭강정한대요@ 컴공 봄부스에서 닭강정한대요@ 컴공
              봄부스에서 닭강정한대요@ 컴공 봄부스에서 닭강정한대요@ 컴공
              봄부스에서 닭강정한대요@
            </p>
          </div>
          <div className='text-light flex items-center gap-x-2 text-sm'>
            <p>3월 21일 18:00</p>·
            <p className='flex items-center gap-x-1'>
              <RiUser3Fill size={12} /> 2:2 모임방
            </p>
          </div>
        </div>
      </button>
    );
  },
);

export default ListItem;
