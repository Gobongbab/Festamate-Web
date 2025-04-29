import React, { forwardRef } from 'react';

import { RiUser3Fill } from 'react-icons/ri';
import { IoLocationSharp } from 'react-icons/io5';

import { useFlow } from '@/app/stackflow';
import { GENDER, PATH } from '@/shared/constants';
import { RoomListItem } from '@/shared/types';
import { cn, getDate } from '@festamate/utils';

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
      meetingDateTime,
      preferredGender,
      place,
    } = props;
    const handleClick = () => {
      push(PATH.ROOM, { ...props });
    };

    return (
      <button
        name='listitem'
        className={cn(
          'rounded-10 grid h-30 w-full flex-shrink-0 cursor-pointer grid-cols-[1fr_3fr] gap-3 py-3 focus:outline-none',
        )}
        onClick={handleClick}
        ref={ref}
      >
        <img className='rounded-5 h-full w-24' src={thumbnail.url || ''} />
        <div className='flex h-full flex-col justify-center gap-y-2 overflow-hidden'>
          <div className='flex flex-col items-start'>
            <p className='w-full overflow-hidden text-start text-lg font-semibold text-nowrap text-ellipsis'>
              {title}
            </p>
            <p className='text-md w-full overflow-hidden text-start text-nowrap text-ellipsis'>
              {getDate(meetingDateTime, 'M월 DD일 ddd요일 A h시 mm분')}
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='text-light flex w-full items-center justify-between'>
              <div className='rounded-5 text-light flex w-fit items-center gap-x-1.5 text-sm'>
                <p className='flex items-center justify-start gap-x-1 overflow-hidden'>
                  <IoLocationSharp size={12} />
                  <span className='w-fit max-w-14 overflow-hidden text-start text-nowrap text-ellipsis'>
                    {place}
                  </span>
                </p>
                ·
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
