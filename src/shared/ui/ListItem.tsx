import React, { forwardRef } from 'react';

import { RiUser3Fill } from 'react-icons/ri';

import { useFlow } from '@/app/stackflow';
import { GENDER, PATH } from '@/shared/constants';
import { RoomListItem } from '@/shared/types';
import { cn } from '@/shared/utils';

interface ListItemProps {
  header?: boolean;
}

const ListItem = forwardRef<HTMLButtonElement, RoomListItem & ListItemProps>(
  function ListItem(props, ref) {
    const { push } = useFlow();
    const {
      title,
      thumbnail,
      maxParticipants,
      currentParticipants,
      preferredGender,
    } = props;
    const handleClick = () => {
      push(PATH.ROOM, { ...props });
    };

    return (
      <button
        name='listitem'
        className={cn(
          'rounded-10 grid h-30 w-full cursor-pointer grid-cols-[1fr_3.5fr] gap-3 focus:outline-none',
        )}
        onClick={handleClick}
        ref={ref}
      >
        <div
          className='rounded-5 bg-fill h-full w-24 bg-cover bg-center'
          style={{ backgroundImage: `url(${thumbnail.url || ''})` }}
        />
        <div className='flex h-full flex-col justify-center gap-y-2 overflow-hidden'>
          <div className='flex flex-col items-start text-lg'>
            <p className='font-semibold'>{title}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='text-light flex w-full items-center justify-between'>
              <div className='rounded-5 text-light flex w-fit items-center gap-x-1.5 text-sm'>
                <p className='flex items-center gap-x-1'>
                  <RiUser3Fill size={12} /> {currentParticipants}명 /{' '}
                  {maxParticipants}명
                </p>
                ·
                <p
                  className={cn(
                    'text-sm',
                    preferredGender === 'MALE' ? 'text-male' : 'text-female',
                  )}
                >
                  {GENDER[preferredGender]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </button>
    );
  },
);

export default ListItem;
